import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule as NestRedisModule } from '@nestjs-labs/nestjs-ioredis';

@Module({
  imports: [
    NestRedisModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          config: {
            url: configService.get<string>('REDIS_URL', 'redis://localhost:6379'),
          },
        }),
      },
      true,
    ),
  ],
})
export class RedisModule {}
