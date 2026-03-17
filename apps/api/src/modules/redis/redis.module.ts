import { Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@nestjs-labs/nestjs-ioredis';
import { AppConfigService } from '../../config/app-config.service';

@Module({
  imports: [
    NestRedisModule.forRootAsync(
      {
        inject: [AppConfigService],
        useFactory: (config: AppConfigService) => ({
          config: {
            url: config.get('redis.url', 'redis://localhost:6379'),
          },
        }),
      },
      true,
    ),
  ],
})
export class RedisModule {}
