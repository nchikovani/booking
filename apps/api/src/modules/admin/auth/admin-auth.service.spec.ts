import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthRepository } from './repositories/admin-auth.repository';
import { BusinessService } from '../../business/business.service';
import { EmailPasswordStrategy } from './strategies/email-password.strategy';
import { EmailService } from '../../email/email.service';
import { AppConfigService } from '../../../config/app-config.service';
import { AppException } from '../../../common/errors/app.exception';
import { ErrorCode } from '../../../common/errors/error-codes';
import { Logger } from 'nestjs-pino';

describe('AdminAuthService', () => {
  let service: AdminAuthService;
  let repository: jest.Mocked<AdminAuthRepository>;
  let jwtService: jest.Mocked<JwtService>;
  let config: jest.Mocked<AppConfigService>;
  let strategy: jest.Mocked<EmailPasswordStrategy>;
  let emailService: jest.Mocked<EmailService>;
  let businessService: jest.Mocked<BusinessService>;

  const mockAdminUser = {
    id: 'user-1',
    email: 'user@example.com',
    firstName: 'Ivan',
    lastName: 'Ivanov',
    emailVerifiedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockRepository = {
      findAdminUserByEmail: jest.fn(),
      findAdminUserByEmailWithCredential: jest.fn(),
      createAdminUserWithAuth: jest.fn(),
      findAdminUserById: jest.fn(),
      createRefreshToken: jest.fn(),
      findRefreshTokenByHash: jest.fn(),
      updateRefreshToken: jest.fn(),
      revokeRefreshTokensByHash: jest.fn(),
      revokeAllRefreshTokensForUser: jest.fn(),
      createLoginAttempt: jest.fn(),
      deleteUnusedPasswordResetTokensForUser: jest.fn(),
      createPasswordResetToken: jest.fn(),
      findPasswordResetTokenByHash: jest.fn(),
      resetPasswordTransaction: jest.fn(),
      findAdminUserWithEmailPasswordProvider: jest.fn(),
      runTransaction: jest.fn((fn) => fn({})),
    };

    const mockJwtService = {
      sign: jest.fn().mockReturnValue('jwt-token'),
    };

    const mockConfig = {
      get: jest.fn((key: string, def?: string) => {
        if (key === 'jwt.accessExpires') return '15m';
        if (key === 'jwt.refreshExpires') return '7d';
        if (key === 'auth.cookieName') return 'refreshToken';
        if (key === 'auth.frontendUrl') return 'http://localhost:3001';
        return def;
      }),
    };

    const mockStrategy = {
      authenticate: jest.fn(),
    };

    const mockEmailService = {
      sendPasswordResetEmail: jest.fn(),
    };

    const mockBusinessService = {
      ensureBusinessForUser: jest.fn().mockResolvedValue({ id: 'b1', role: 'OWNER' }),
    };

    const mockLogger = {
      log: jest.fn(),
      error: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminAuthService,
        { provide: AdminAuthRepository, useValue: mockRepository },
        { provide: JwtService, useValue: mockJwtService },
        { provide: AppConfigService, useValue: mockConfig },
        { provide: EmailPasswordStrategy, useValue: mockStrategy },
        { provide: EmailService, useValue: mockEmailService },
        { provide: BusinessService, useValue: mockBusinessService },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get(AdminAuthService);
    repository = module.get(AdminAuthRepository) as jest.Mocked<AdminAuthRepository>;
    jwtService = module.get(JwtService) as jest.Mocked<JwtService>;
    config = module.get(AppConfigService) as jest.Mocked<AppConfigService>;
    strategy = module.get(EmailPasswordStrategy) as jest.Mocked<EmailPasswordStrategy>;
    emailService = module.get(EmailService) as jest.Mocked<EmailService>;
    businessService = module.get(BusinessService) as jest.Mocked<BusinessService>;

    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should create user and return tokens', async () => {
      repository.findAdminUserByEmail.mockResolvedValue(null);
      repository.createAdminUserWithAuth.mockResolvedValue(mockAdminUser);

      const result = await service.register(
        { email: 'user@example.com', password: 'Password1' },
        'Mozilla/5.0',
      );

      expect(result.user).toEqual({
        id: mockAdminUser.id,
        email: mockAdminUser.email,
        firstName: mockAdminUser.firstName,
        lastName: mockAdminUser.lastName,
      });
      expect(result.accessToken).toBe('jwt-token');
      expect(result.refreshToken).toBe('jwt-token');
      expect(repository.findAdminUserByEmail).toHaveBeenCalledWith('user@example.com');
      expect(repository.createAdminUserWithAuth).toHaveBeenCalled();
      expect(repository.createRefreshToken).toHaveBeenCalled();
    });

    it('should throw EMAIL_ALREADY_EXISTS when email exists', async () => {
      repository.findAdminUserByEmail.mockResolvedValue(mockAdminUser);

      await expect(
        service.register({ email: 'user@example.com', password: 'Password1' }),
      ).rejects.toThrow(AppException);

      try {
        await service.register({ email: 'user@example.com', password: 'Password1' });
      } catch (e) {
        expect(e).toBeInstanceOf(AppException);
        expect((e as AppException).code).toBe(ErrorCode.EMAIL_ALREADY_EXISTS);
      }
    });

    it('should normalize email (trim, lowercase)', async () => {
      repository.findAdminUserByEmail.mockResolvedValue(null);
      repository.createAdminUserWithAuth.mockResolvedValue(mockAdminUser);

      await service.register({ email: '  User@Example.COM  ', password: 'Password1' });

      expect(repository.findAdminUserByEmail).toHaveBeenCalledWith('user@example.com');
    });
  });

  describe('login', () => {
    it('should return tokens on success', async () => {
      strategy.authenticate.mockResolvedValue({ adminUser: mockAdminUser });
      repository.createRefreshToken.mockResolvedValue({ id: 'rt-1' });

      const result = await service.login(
        { email: 'user@example.com', password: 'Password1' },
        'Mozilla/5.0',
        '127.0.0.1',
      );

      expect(result.user.email).toBe('user@example.com');
      expect(result.accessToken).toBe('jwt-token');
      expect(result.refreshToken).toBe('jwt-token');
      expect(repository.createLoginAttempt).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'user@example.com',
          success: true,
          ipAddress: '127.0.0.1',
        }),
      );
    });

    it('should throw INVALID_CREDENTIALS on wrong password', async () => {
      strategy.authenticate.mockResolvedValue(null);

      await expect(
        service.login(
          { email: 'user@example.com', password: 'WrongPass1' },
          undefined,
          '127.0.0.1',
        ),
      ).rejects.toThrow(AppException);

      try {
        await service.login(
          { email: 'user@example.com', password: 'WrongPass1' },
          undefined,
          '127.0.0.1',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(AppException);
        expect((e as AppException).code).toBe(ErrorCode.INVALID_CREDENTIALS);
      }
      expect(repository.createLoginAttempt).toHaveBeenCalledWith(
        expect.objectContaining({ success: false }),
      );
    });
  });

  describe('me', () => {
    it('should call ensureBusinessForUser and return user by id', async () => {
      repository.findAdminUserById.mockResolvedValue(mockAdminUser);

      const result = await service.me('user-1');

      expect(businessService.ensureBusinessForUser).toHaveBeenCalledWith('user-1');
      expect(result).toEqual({
        id: mockAdminUser.id,
        email: mockAdminUser.email,
        firstName: mockAdminUser.firstName,
        lastName: mockAdminUser.lastName,
      });
    });
  });

  describe('refresh', () => {
    it('should return new tokens when valid refresh cookie', async () => {
      const storedToken = {
        id: 'rt-1',
        adminUserId: 'user-1',
        tokenHash: 'hash',
        deviceInfo: 'Mozilla',
        expiresAt: new Date(Date.now() + 86400000),
        revokedAt: null,
        adminUser: mockAdminUser,
      };
      repository.findRefreshTokenByHash.mockResolvedValue(storedToken);
      repository.createRefreshToken.mockResolvedValue({ id: 'rt-2' });

      const result = await service.refresh('user-1', {
        cookies: { refreshToken: 'valid-refresh-jwt' },
      });

      expect(result.accessToken).toBe('jwt-token');
      expect(result.refreshToken).toBe('jwt-token');
      expect(repository.updateRefreshToken).toHaveBeenCalledWith(
        'rt-1',
        expect.objectContaining({ revokedAt: expect.any(Date), replacedBy: 'rt-2' }),
      );
    });

    it('should throw REFRESH_TOKEN_EXPIRED when no cookie', async () => {
      await expect(service.refresh('user-1', { cookies: {} })).rejects.toThrow(AppException);
      try {
        await service.refresh('user-1', { cookies: {} });
      } catch (e) {
        expect(e).toBeInstanceOf(AppException);
        expect((e as AppException).code).toBe(ErrorCode.REFRESH_TOKEN_EXPIRED);
      }
    });

    it('should throw REFRESH_TOKEN_EXPIRED when token not in DB', async () => {
      repository.findRefreshTokenByHash.mockResolvedValue(null);

      await expect(
        service.refresh('user-1', { cookies: { refreshToken: 'unknown' } }),
      ).rejects.toThrow(AppException);
    });

    it('should throw REFRESH_TOKEN_REVOKED when token was revoked', async () => {
      repository.findRefreshTokenByHash.mockResolvedValue({
        id: 'rt-1',
        adminUserId: 'user-1',
        tokenHash: 'hash',
        deviceInfo: null,
        expiresAt: new Date(Date.now() + 86400000),
        revokedAt: new Date(),
        adminUser: mockAdminUser,
      });

      await expect(
        service.refresh('user-1', { cookies: { refreshToken: 'revoked' } }),
      ).rejects.toThrow(AppException);
    });
  });

  describe('logout', () => {
    it('should revoke token by hash', async () => {
      await service.logout(
        { sub: 'user-1' },
        {
          cookies: { refreshToken: 'valid-jwt' },
        },
      );

      expect(repository.revokeRefreshTokensByHash).toHaveBeenCalled();
    });

    it('should throw UNAUTHORIZED when no cookie', async () => {
      await expect(service.logout({ sub: 'user-1' }, { cookies: {} })).rejects.toThrow(
        AppException,
      );
      try {
        await service.logout({ sub: 'user-1' }, { cookies: {} });
      } catch (e) {
        expect((e as AppException).code).toBe(ErrorCode.UNAUTHORIZED);
      }
    });
  });

  describe('forgotPassword', () => {
    it('should do nothing when user not found', async () => {
      repository.findAdminUserWithEmailPasswordProvider.mockResolvedValue(null);

      await service.forgotPassword({ email: 'unknown@example.com' });

      expect(repository.createPasswordResetToken).not.toHaveBeenCalled();
      expect(emailService.sendPasswordResetEmail).not.toHaveBeenCalled();
    });

    it('should create token and send email when user found', async () => {
      repository.findAdminUserWithEmailPasswordProvider.mockResolvedValue(mockAdminUser);

      await service.forgotPassword({ email: 'user@example.com' });

      expect(repository.deleteUnusedPasswordResetTokensForUser).toHaveBeenCalledWith('user-1');
      expect(repository.createPasswordResetToken).toHaveBeenCalled();
      expect(emailService.sendPasswordResetEmail).toHaveBeenCalledWith(
        'user@example.com',
        expect.stringContaining('/reset-password?token='),
        expect.any(String),
      );
    });
  });

  describe('resetPassword', () => {
    it('should throw INVALID_OR_EXPIRED_TOKEN when token not found', async () => {
      repository.findPasswordResetTokenByHash.mockResolvedValue(null);

      await expect(
        service.resetPassword({ token: 'invalid', password: 'NewPass1' }),
      ).rejects.toThrow(AppException);
    });

    it('should throw INVALID_OR_EXPIRED_TOKEN when token expired', async () => {
      repository.findPasswordResetTokenByHash.mockResolvedValue({
        id: 'prt-1',
        adminUserId: 'user-1',
        tokenHash: 'hash',
        expiresAt: new Date(Date.now() - 1000),
        usedAt: null,
        adminUser: mockAdminUser as never,
      });

      await expect(
        service.resetPassword({ token: 'expired', password: 'NewPass1' }),
      ).rejects.toThrow(AppException);
    });

    it('should update password when token valid', async () => {
      repository.findPasswordResetTokenByHash.mockResolvedValue({
        id: 'prt-1',
        adminUserId: 'user-1',
        tokenHash: 'hash',
        expiresAt: new Date(Date.now() + 3600000),
        usedAt: null,
        adminUser: {
          ...mockAdminUser,
          authProviders: [{ credential: { id: 'cred-1', passwordHash: 'old' } }],
        },
      } as never);

      await service.resetPassword({ token: 'valid-token', password: 'NewPass1' });

      expect(repository.resetPasswordTransaction).toHaveBeenCalledWith(
        expect.objectContaining({
          credentialId: 'cred-1',
          resetTokenId: 'prt-1',
          adminUserId: 'user-1',
        }),
      );
    });
  });
});
