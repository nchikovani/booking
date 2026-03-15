import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Logger } from 'nestjs-pino';
import { AdminAuthRepository } from './repositories/admin-auth.repository';

@Injectable()
export class AuthTokenCleanupService {
  constructor(
    private readonly repository: AdminAuthRepository,
    private readonly logger: Logger,
  ) {}

  /** Ежедневно в 03:00 — удаление истёкших refresh-токенов и токенов сброса пароля. */
  @Cron('0 3 * * *', { name: 'auth-token-cleanup' })
  async handleExpiredTokensCleanup(): Promise<void> {
    try {
      const [refreshResult, resetResult] = await Promise.all([
        this.repository.deleteExpiredRevokedRefreshTokens(),
        this.repository.deleteExpiredPasswordResetTokens(),
      ]);
      if (refreshResult.count > 0 || resetResult.count > 0) {
        this.logger.log(
          {
            refreshTokensDeleted: refreshResult.count,
            passwordResetTokensDeleted: resetResult.count,
          },
          '[Auth] Expired tokens cleanup completed',
        );
      }
    } catch (err) {
      this.logger.error(
        { err },
        '[Auth] Expired tokens cleanup failed',
      );
    }
  }
}
