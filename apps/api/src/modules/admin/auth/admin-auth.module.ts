import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthRepository } from './repositories/admin-auth.repository';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminRefreshGuard } from './guards/admin-refresh.guard';
import { AuthEmailThrottlerGuard } from './guards/auth-email-throttler.guard';
import { AuthTokenCleanupService } from './auth-token-cleanup.service';
import { EmailPasswordStrategy } from './strategies/email-password.strategy';
import { AppConfigModule } from '../../../config/app-config.module';
import { AppConfigService } from '../../../config/app-config.service';
import { LoggerModule } from '../../../common/logger/logger.module';
import { RedisModule } from '../../../modules/redis/redis.module';
import { parseExpiresToSeconds } from './utils/parse-expires';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    RedisModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => {
        const accessExpires = config.get('jwt.accessExpires', '15m');
        const expiresInSec = parseExpiresToSeconds(accessExpires);
        return {
          secret: config.get('jwt.secret'),
          signOptions: { expiresIn: expiresInSec },
        };
      },
    }),
  ],
  controllers: [AdminAuthController],
  providers: [
    AdminAuthRepository,
    AdminAuthService,
    AuthTokenCleanupService,
    EmailPasswordStrategy,
    AdminAuthGuard,
    AdminRefreshGuard,
    AuthEmailThrottlerGuard,
  ],
  exports: [AdminAuthService, AdminAuthGuard],
})
export class AdminAuthModule { }
