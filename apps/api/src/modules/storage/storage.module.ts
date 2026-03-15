import { Module } from '@nestjs/common';
import { NestMinioModule } from 'nestjs-minio';
import { AppConfigService } from '../../config/app-config.service';
import { StorageService } from './storage.service';
import { StorageInitService } from './storage-init.service';

@Module({
  imports: [
    NestMinioModule.registerAsync({
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        isGlobal: true,
        endPoint: config.get('minio.endPoint', 'localhost'),
        port: config.get('minio.port', 9000),
        useSSL: config.get('minio.useSSL', false),
        accessKey: config.get('minio.accessKey', 'minioadmin'),
        secretKey: config.get('minio.secretKey', 'minioadmin'),
      }),
    }),
  ],
  providers: [StorageService, StorageInitService],
  exports: [StorageService],
})
export class StorageModule {}
