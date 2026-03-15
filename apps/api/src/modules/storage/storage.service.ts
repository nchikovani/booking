import { Injectable } from '@nestjs/common';
import { InjectMinio } from 'nestjs-minio';
import { Client } from 'minio';
import sharp from 'sharp';
import { AppConfigService } from '../../config/app-config.service';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';

/** Max output size (stored in MinIO). */
const MAX_OUTPUT_SIZE = 5 * 1024 * 1024; // 5 MB
/** Max input size (prevents DoS from huge uploads). */
const MAX_INPUT_SIZE = 50 * 1024 * 1024; // 50 MB
const QUALITY_LEVELS = [85, 70, 50, 30] as const;

export interface UploadOptions {
  /** Max width for resizing (e.g. 1920 for cover image). Omit for logo (no resize). */
  maxWidth?: number;
}

@Injectable()
export class StorageService {
  constructor(
    @InjectMinio() private readonly minio: Client,
    private readonly config: AppConfigService,
  ) { }

  /**
   * Converts image to WebP and uploads to MinIO.
   * If result exceeds 5 MB, reduces quality iteratively until it fits.
   * @param buffer - Image buffer (JPEG, PNG, or WebP)
   * @param key - Object key (e.g. businesses/{id}/logo.webp)
   * @param options - Optional resize (maxWidth for cover images)
   * @returns The key (path) for storing in DB
   */
  async upload(buffer: Buffer, key: string, options?: UploadOptions): Promise<string> {
    if (buffer.length > MAX_INPUT_SIZE) {
      throw AppException.create(ErrorCode.VALIDATION_FAILED, 'File size exceeds 50 MB');
    }

    let processed: Buffer;
    try {
      let pipeline = sharp(buffer);
      const metadata = await pipeline.metadata();
      const format = metadata.format;

      if (!format || !['jpeg', 'jpg', 'png', 'webp'].includes(format)) {
        throw AppException.create(ErrorCode.VALIDATION_FAILED, 'Invalid image format. Use JPEG, PNG, or WebP');
      }

      if (options?.maxWidth) {
        pipeline = pipeline.resize(options.maxWidth, undefined, { withoutEnlargement: true });
      }

      processed = await this.compressToFit(pipeline);
    } catch (err) {
      if (err instanceof AppException) throw err;
      throw AppException.create(ErrorCode.VALIDATION_FAILED, 'Invalid or corrupted image');
    }

    const bucket = this.config.get('fileStorage.bucket', 'uploads');
    await this.minio.putObject(bucket, key, processed, processed.length, {
      'Content-Type': 'image/webp',
    });

    return key;
  }

  /**
   * Compresses image to WebP, reducing quality iteratively if result exceeds MAX_OUTPUT_SIZE.
   */
  private async compressToFit(
    pipeline: sharp.Sharp,
  ): Promise<Buffer> {
    for (const quality of QUALITY_LEVELS) {
      const buffer = await pipeline.clone().webp({ quality }).toBuffer();
      if (buffer.length <= MAX_OUTPUT_SIZE) {
        return buffer;
      }
    }

    throw AppException.create(
      ErrorCode.VALIDATION_FAILED,
      'Image is too large. Try using a smaller or lower resolution image.',
    );
  }

  /**
   * Deletes object from MinIO. Idempotent — does not throw if object does not exist.
   */
  async delete(key: string): Promise<void> {
    const bucket = this.config.get('fileStorage.bucket', 'uploads');
    try {
      await this.minio.removeObject(bucket, key);
    } catch {
      // Idempotent: consider success if object was already gone
    }
  }

  /**
   * Builds full public URL for a stored path.
   */
  getPublicUrl(path: string): string {
    const baseUrl = this.config.get('fileStorage.url', 'http://localhost:9000/uploads');
    const trimmed = baseUrl.replace(/\/$/, '');
    const pathTrimmed = path.startsWith('/') ? path.slice(1) : path;
    return `${trimmed}/${pathTrimmed}`;
  }
}
