import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectMinio } from 'nestjs-minio';
import { Client } from 'minio';
import { Logger } from 'nestjs-pino';
import { AppConfigService } from '../../config/app-config.service';

@Injectable()
export class StorageInitService implements OnModuleInit {
  constructor(
    @InjectMinio() private readonly minio: Client,
    private readonly config: AppConfigService,
    private readonly logger: Logger,
  ) {}

  async onModuleInit(): Promise<void> {
    const bucket = this.config.get('fileStorage.bucket', 'uploads');
    try {
      const exists = await this.minio.bucketExists(bucket);
      if (!exists) {
        await this.minio.makeBucket(bucket, 'us-east-1');
        this.logger.log({ bucket }, '[Storage] Bucket created');
      }

      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { AWS: ['*'] },
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${bucket}/*`],
          },
        ],
      };
      await this.minio.setBucketPolicy(bucket, JSON.stringify(policy));
    } catch (err) {
      this.logger.warn(
        { bucket, error: err instanceof Error ? err.message : String(err) },
        '[Storage] Failed to init bucket (MinIO may be unavailable)',
      );
    }
  }
}
