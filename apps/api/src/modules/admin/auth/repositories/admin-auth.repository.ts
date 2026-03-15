import { Inject, Injectable } from '@nestjs/common';
import { AuthProviderType } from '@repo/prisma';
import { PRISMA } from '../../../prisma/prisma.module';
import type { AdminUser, Prisma, PrismaClient } from '@repo/prisma';

export interface AdminUserWithCredential extends AdminUser {
  authProviders: Array<{
    credential: { passwordHash: string } | null;
  }>;
}

export interface CreateAdminUserWithAuthData {
  email: string;
  firstName: string | null;
  lastName: string | null;
  passwordHash: string;
}

export interface CreateRefreshTokenData {
  adminUserId: string;
  tokenHash: string;
  deviceInfo: string | null;
  expiresAt: Date;
}

export interface RefreshTokenWithAdminUser {
  id: string;
  adminUserId: string;
  tokenHash: string;
  deviceInfo: string | null;
  expiresAt: Date;
  revokedAt: Date | null;
  adminUser: AdminUser;
}

export interface PasswordResetTokenWithAdminUser {
  id: string;
  adminUserId: string;
  tokenHash: string;
  expiresAt: Date;
  usedAt: Date | null;
  adminUser: AdminUser & {
    authProviders: Array<{
      credential: { id: string; passwordHash: string } | null;
    }>;
  };
}

@Injectable()
export class AdminAuthRepository {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  async findAdminUserByEmail(email: string): Promise<AdminUser | null> {
    return this.prisma.adminUser.findUnique({
      where: { email },
    });
  }

  async findAdminUserByEmailWithCredential(
    email: string,
  ): Promise<AdminUserWithCredential | null> {
    return this.prisma.adminUser.findFirst({
      where: { email },
      include: {
        authProviders: {
          where: { type: AuthProviderType.EMAIL_PASSWORD },
          include: { credential: true },
        },
      },
    }) as Promise<AdminUserWithCredential | null>;
  }

  async createAdminUserWithAuth(
    data: CreateAdminUserWithAuthData,
    tx?: Prisma.TransactionClient,
  ): Promise<AdminUser> {
    const client = tx ?? this.prisma;
    const adminUser = await client.adminUser.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    const authProvider = await client.authProvider.create({
      data: {
        adminUserId: adminUser.id,
        type: AuthProviderType.EMAIL_PASSWORD,
      },
    });

    await client.userCredential.create({
      data: {
        authProviderId: authProvider.id,
        passwordHash: data.passwordHash,
      },
    });

    return adminUser;
  }

  async findAdminUserById(id: string): Promise<AdminUser> {
    return this.prisma.adminUser.findUniqueOrThrow({
      where: { id },
    });
  }

  async createRefreshToken(
    data: CreateRefreshTokenData,
    tx?: Prisma.TransactionClient,
  ): Promise<{ id: string }> {
    const client = tx ?? this.prisma;
    return client.refreshToken.create({
      data: {
        adminUserId: data.adminUserId,
        tokenHash: data.tokenHash,
        deviceInfo: data.deviceInfo,
        expiresAt: data.expiresAt,
      },
      select: { id: true },
    });
  }

  async findRefreshTokenByHash(
    tokenHash: string,
  ): Promise<RefreshTokenWithAdminUser | null> {
    return this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { adminUser: true },
    }) as Promise<RefreshTokenWithAdminUser | null>;
  }

  async updateRefreshToken(
    id: string,
    data: { revokedAt: Date; replacedBy: string },
  ): Promise<void> {
    await this.prisma.refreshToken.update({
      where: { id },
      data,
    });
  }

  async revokeRefreshTokensByHash(tokenHash: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { tokenHash },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllRefreshTokensForUser(adminUserId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { adminUserId },
      data: { revokedAt: new Date() },
    });
  }

  async createLoginAttempt(
    data: {
      email: string;
      success: boolean;
      ipAddress?: string | null;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = tx ?? this.prisma;
    await client.loginAttempt.create({
      data: {
        email: data.email,
        success: data.success,
        ipAddress: data.ipAddress ?? null,
      },
    });
  }

  async findAdminUserWithEmailPasswordProvider(
    email: string,
  ): Promise<AdminUser | null> {
    const result = await this.prisma.adminUser.findFirst({
      where: { email },
      include: {
        authProviders: { where: { type: AuthProviderType.EMAIL_PASSWORD } },
      },
    });
    return result?.authProviders?.length ? result : null;
  }

  async deleteUnusedPasswordResetTokensForUser(
    adminUserId: string,
  ): Promise<void> {
    await this.prisma.passwordResetToken.deleteMany({
      where: { adminUserId, usedAt: null },
    });
  }

  async createPasswordResetToken(data: {
    adminUserId: string;
    tokenHash: string;
    expiresAt: Date;
  }): Promise<void> {
    await this.prisma.passwordResetToken.create({
      data,
    });
  }

  async findPasswordResetTokenByHash(
    tokenHash: string,
  ): Promise<PasswordResetTokenWithAdminUser | null> {
    return this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: {
        adminUser: {
          include: {
            authProviders: {
              where: { type: AuthProviderType.EMAIL_PASSWORD },
              include: { credential: true },
            },
          },
        },
      },
    }) as Promise<PasswordResetTokenWithAdminUser | null>;
  }

  async resetPasswordTransaction(data: {
    credentialId: string;
    passwordHash: string;
    resetTokenId: string;
    adminUserId: string;
  }): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.userCredential.update({
        where: { id: data.credentialId },
        data: { passwordHash: data.passwordHash },
      });
      await tx.passwordResetToken.update({
        where: { id: data.resetTokenId },
        data: { usedAt: new Date() },
      });
      await tx.refreshToken.updateMany({
        where: { adminUserId: data.adminUserId },
        data: { revokedAt: new Date() },
      });
    });
  }

  async runTransaction<T>(
    fn: (tx: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    return this.prisma.$transaction(fn);
  }

  /** Удаляет истёкшие и отозванные refresh-токены (для cron). */
  async deleteExpiredRevokedRefreshTokens(): Promise<{ count: number }> {
    const result = await this.prisma.refreshToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
        revokedAt: { not: null },
      },
    });
    return { count: result.count };
  }

  /** Удаляет истёкшие токены сброса пароля (для cron). */
  async deleteExpiredPasswordResetTokens(): Promise<{ count: number }> {
    const result = await this.prisma.passwordResetToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
    return { count: result.count };
  }
}
