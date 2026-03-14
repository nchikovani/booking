import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestMinioModule } from 'nestjs-minio';

@Module({
  imports: [
    NestMinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        isGlobal: true,
        endPoint: configService.get<string>('MINIO_ENDPOINT', 'localhost'),
        port: configService.get<number>('MINIO_PORT', 9000),
        useSSL: configService.get<string>('MINIO_USE_SSL') === 'true',
        accessKey: configService.get<string>('MINIO_ACCESS_KEY', 'minioadmin'),
        secretKey: configService.get<string>('MINIO_SECRET_KEY', 'minioadmin'),
      }),
    }),
  ],
})
export class StorageModule {}
