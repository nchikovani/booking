import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as argon2 from 'argon2';
import { createHash, randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '../../../config/app-config.service';
import { AppException } from '../../../common/errors/app.exception';
import { ErrorCode } from '../../../common/errors/error-codes';
import type { RegisterDto } from './dto/register.dto';
import type { LoginDto } from './dto/login.dto';
import type { ForgotPasswordDto } from './dto/forgot-password.dto';
import type { ResetPasswordDto } from './dto/reset-password.dto';
import { EmailPasswordStrategy } from './strategies/email-password.strategy';
import { AdminAuthRepository } from './repositories/admin-auth.repository';
import { BusinessService } from '../../business/business.service';
import { EmailService } from '../../email/email.service';
import { parseExpiresToSeconds } from './utils/parse-expires';

export interface AuthResponse {
  user: { id: string; email: string | null; firstName: string | null; lastName: string | null };
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export type MeResponseUser = AuthResponse['user'] & {
  businessId: string;
};

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly repository: AdminAuthRepository,
    private readonly jwtService: JwtService,
    private readonly config: AppConfigService,
    private readonly emailPasswordStrategy: EmailPasswordStrategy,
    private readonly emailService: EmailService,
    private readonly businessService: BusinessService,
    private readonly logger: Logger,
  ) { }

  async register(dto: RegisterDto, deviceInfo?: string): Promise<AuthResponse> {
    const email = dto.email.trim().toLowerCase();
    const existing = await this.repository.findAdminUserByEmail(email);
    if (existing) throw AppException.create(ErrorCode.EMAIL_ALREADY_EXISTS);

    const passwordHash = await argon2.hash(dto.password);
    const accessExpires = this.config.get('jwt.accessExpires', '15m');
    const expiresInSec = parseExpiresToSeconds(accessExpires);
    const refreshExpiresSec = parseExpiresToSeconds(this.config.get('jwt.refreshExpires', '7d'));

    const result = await this.repository.runTransaction(async (tx) => {
      const adminUser = await this.repository.createAdminUserWithAuth(
        {
          email,
          firstName: dto.firstName ?? null,
          lastName: dto.lastName ?? null,
          passwordHash,
        },
        tx,
      );

      const refreshToken = this.jwtService.sign(
        { sub: adminUser.id, type: 'refresh', jti: randomUUID() },
        { expiresIn: refreshExpiresSec },
      );
      const tokenHash = createHash('sha256').update(refreshToken).digest('hex');
      const refreshExpiresAt = new Date(Date.now() + refreshExpiresSec * 1000);

      await this.repository.createRefreshToken(
        {
          adminUserId: adminUser.id,
          tokenHash,
          deviceInfo: deviceInfo ?? null,
          expiresAt: refreshExpiresAt,
        },
        tx,
      );

      const accessToken = this.jwtService.sign(
        { sub: adminUser.id, type: 'access' },
        { expiresIn: expiresInSec },
      );

      await this.repository.createLoginAttempt({ email, success: true }, tx);

      return {
        adminUser,
        accessToken,
        refreshToken,
        expiresIn: expiresInSec,
      };
    });

    return {
      user: {
        id: result.adminUser.id,
        email: result.adminUser.email,
        firstName: result.adminUser.firstName,
        lastName: result.adminUser.lastName,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      expiresIn: result.expiresIn,
    };
  }

  async login(dto: LoginDto, deviceInfo?: string, ipAddress?: string): Promise<AuthResponse> {
    const email = dto.email.trim().toLowerCase();
    const result = await this.emailPasswordStrategy.authenticate({
      email,
      password: dto.password,
    });

    if (!result) {
      this.logger.log(
        { ip: ipAddress, userAgent: deviceInfo, email, success: false },
        '[Auth] Login failed',
      );
      await this.repository.createLoginAttempt({
        email,
        success: false,
        ipAddress: ipAddress ?? null,
      });
      throw AppException.create(ErrorCode.INVALID_CREDENTIALS);
    }

    const accessExpires = this.config.get('jwt.accessExpires', '15m');
    const expiresInSec = parseExpiresToSeconds(accessExpires);
    const refreshExpiresSec = parseExpiresToSeconds(this.config.get('jwt.refreshExpires', '7d'));
    const accessToken = this.jwtService.sign(
      { sub: result.adminUser.id, type: 'access' },
      { expiresIn: expiresInSec },
    );
    const refreshToken = this.jwtService.sign(
      { sub: result.adminUser.id, type: 'refresh', jti: randomUUID() },
      { expiresIn: refreshExpiresSec },
    );
    const tokenHash = createHash('sha256').update(refreshToken).digest('hex');
    const refreshExpiresAt = new Date(Date.now() + refreshExpiresSec * 1000);

    await this.repository.createRefreshToken({
      adminUserId: result.adminUser.id,
      tokenHash,
      deviceInfo: deviceInfo ?? null,
      expiresAt: refreshExpiresAt,
    });

    this.logger.log(
      { ip: ipAddress, userAgent: deviceInfo, email, success: true },
      '[Auth] Login success',
    );
    await this.repository.createLoginAttempt({
      email,
      success: true,
      ipAddress: ipAddress ?? null,
    });

    return {
      user: {
        id: result.adminUser.id,
        email: result.adminUser.email,
        firstName: result.adminUser.firstName,
        lastName: result.adminUser.lastName,
      },
      accessToken,
      refreshToken,
      expiresIn: expiresInSec,
    };
  }

  async me(adminUserId: string): Promise<MeResponseUser> {
    const business = await this.businessService.ensureBusinessForUser(adminUserId);
    const adminUser = await this.repository.findAdminUserById(adminUserId);
    return {
      id: adminUser.id,
      email: adminUser.email,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      businessId: business.id,
    };
  }

  async refresh(
    adminUserId: string,
    req: { cookies?: Record<string, string> },
  ): Promise<AuthResponse> {
    const cookieName = this.config.get('auth.cookieName', 'refreshToken');
    const refreshToken = req.cookies?.[cookieName];
    if (!refreshToken) throw AppException.create(ErrorCode.REFRESH_TOKEN_EXPIRED);

    const tokenHash = createHash('sha256').update(refreshToken).digest('hex');
    const stored = await this.repository.findRefreshTokenByHash(tokenHash);

    if (!stored) throw AppException.create(ErrorCode.REFRESH_TOKEN_EXPIRED);
    if (stored.revokedAt) {
      await this.repository.revokeAllRefreshTokensForUser(stored.adminUserId);
      throw AppException.create(ErrorCode.REFRESH_TOKEN_REVOKED);
    }
    if (stored.expiresAt < new Date()) throw AppException.create(ErrorCode.REFRESH_TOKEN_EXPIRED);

    const refreshExpiresSec = parseExpiresToSeconds(this.config.get('jwt.refreshExpires', '7d'));
    const newRefreshToken = this.jwtService.sign(
      { sub: adminUserId, type: 'refresh', jti: randomUUID() },
      { expiresIn: refreshExpiresSec },
    );
    const newTokenHash = createHash('sha256').update(newRefreshToken).digest('hex');
    const refreshExpiresAt = new Date(Date.now() + refreshExpiresSec * 1000);

    const newStored = await this.repository.createRefreshToken({
      adminUserId,
      tokenHash: newTokenHash,
      deviceInfo: stored.deviceInfo,
      expiresAt: refreshExpiresAt,
    });

    await this.repository.updateRefreshToken(stored.id, {
      revokedAt: new Date(),
      replacedBy: newStored.id,
    });

    const accessExpires = this.config.get('jwt.accessExpires', '15m');
    const expiresInSec = parseExpiresToSeconds(accessExpires);
    const accessToken = this.jwtService.sign(
      { sub: adminUserId, type: 'access' },
      { expiresIn: expiresInSec },
    );

    return {
      user: {
        id: stored.adminUser.id,
        email: stored.adminUser.email,
        firstName: stored.adminUser.firstName,
        lastName: stored.adminUser.lastName,
      },
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: expiresInSec,
    };
  }

  async logout(
    _payload: { sub: string; jti?: string },
    req: { cookies?: Record<string, string> },
  ): Promise<void> {
    const cookieName = this.config.get('auth.cookieName', 'refreshToken');
    const refreshToken = req.cookies?.[cookieName];
    if (!refreshToken) throw AppException.create(ErrorCode.UNAUTHORIZED);

    const tokenHash = createHash('sha256').update(refreshToken).digest('hex');
    await this.repository.revokeRefreshTokensByHash(tokenHash);
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const email = dto.email.trim().toLowerCase();
    const adminUser = await this.repository.findAdminUserWithEmailPasswordProvider(email);

    if (!adminUser) return;

    await this.repository.deleteUnusedPasswordResetTokensForUser(adminUser.id);

    const token = randomUUID();
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await this.repository.createPasswordResetToken({
      adminUserId: adminUser.id,
      tokenHash,
      expiresAt,
    });

    const frontendUrl = this.config.get('auth.frontendUrl', 'http://localhost:3001');
    const link = `${frontendUrl}/reset-password?token=${token}`;
    this.emailService.sendPasswordResetEmail(email, link, token);
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const tokenHash = createHash('sha256').update(dto.token).digest('hex');
    const resetToken = await this.repository.findPasswordResetTokenByHash(tokenHash);

    if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
      throw AppException.create(ErrorCode.INVALID_OR_EXPIRED_TOKEN);
    }

    const credential = resetToken.adminUser.authProviders[0]?.credential;
    if (!credential) throw AppException.create(ErrorCode.INVALID_OR_EXPIRED_TOKEN);

    const passwordHash = await argon2.hash(dto.password);
    await this.repository.resetPasswordTransaction({
      credentialId: credential.id,
      passwordHash,
      resetTokenId: resetToken.id,
      adminUserId: resetToken.adminUserId,
    });
  }
}
