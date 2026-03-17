import { Test, TestingModule } from '@nestjs/testing';
import { Client } from 'minio';
import sharp from 'sharp';
import { StorageService } from './storage.service';
import { AppConfigService } from '../../config/app-config.service';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';
import { MINIO_CONNECTION } from 'nestjs-minio';

describe('StorageService', () => {
  let service: StorageService;
  let minio: jest.Mocked<Client>;
  let config: jest.Mocked<AppConfigService>;

  const createJpegBuffer = async (): Promise<Buffer> => {
    return sharp({
      create: { width: 10, height: 10, channels: 3, background: { r: 255, g: 0, b: 0 } },
    })
      .jpeg()
      .toBuffer();
  };

  const createWebpBuffer = async (): Promise<Buffer> => {
    return sharp({
      create: { width: 10, height: 10, channels: 3, background: { r: 0, g: 255, b: 0 } },
    })
      .webp()
      .toBuffer();
  };

  beforeEach(async () => {
    const mockMinio = {
      putObject: jest.fn().mockResolvedValue(undefined),
      removeObject: jest.fn().mockResolvedValue(undefined),
    };

    const mockConfig = {
      get: jest.fn((key: string, def?: string) => {
        if (key === 'fileStorage.bucket') return 'uploads';
        if (key === 'fileStorage.url') return 'http://localhost:9000/uploads';
        return def;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StorageService,
        { provide: MINIO_CONNECTION, useValue: mockMinio },
        { provide: AppConfigService, useValue: mockConfig },
      ],
    }).compile();

    service = module.get(StorageService);
    minio = module.get(MINIO_CONNECTION) as jest.Mocked<Client>;
    config = module.get(AppConfigService) as jest.Mocked<AppConfigService>;

    jest.clearAllMocks();
  });

  describe('upload', () => {
    it('should convert JPEG to WebP and call putObject', async () => {
      const buffer = await createJpegBuffer();
      const key = 'businesses/1/logo.webp';

      const result = await service.upload(buffer, key);

      expect(result).toBe(key);
      expect(minio.putObject).toHaveBeenCalledWith(
        'uploads',
        key,
        expect.any(Buffer),
        expect.any(Number),
        expect.objectContaining({ 'Content-Type': 'image/webp' }),
      );
      const putBuffer = (minio.putObject as jest.Mock).mock.calls[0][2];
      expect(putBuffer.length).toBeLessThanOrEqual(buffer.length * 2);
    });

    it('should process WebP buffer and upload', async () => {
      const buffer = await createWebpBuffer();
      const key = 'businesses/1/image.webp';

      const result = await service.upload(buffer, key);

      expect(result).toBe(key);
      expect(minio.putObject).toHaveBeenCalled();
    });

    it('should throw VALIDATION_FAILED for buffer > 8 MB', async () => {
      const buffer = Buffer.alloc(51 * 1024 * 1024);

      await expect(service.upload(buffer, 'test.webp')).rejects.toThrow(AppException);
      await expect(service.upload(buffer, 'test.webp')).rejects.toMatchObject({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'File size exceeds 8 MB',
      });
      expect(minio.putObject).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should call removeObject for existing key', async () => {
      await service.delete('businesses/1/logo.webp');

      expect(minio.removeObject).toHaveBeenCalledWith('uploads', 'businesses/1/logo.webp');
    });

    it('should not throw when object does not exist (idempotent)', async () => {
      (minio.removeObject as jest.Mock).mockRejectedValueOnce(new Error('Not found'));

      await expect(service.delete('non-existent.webp')).resolves.not.toThrow();
    });
  });

  describe('getPublicUrl', () => {
    it('should build full URL from path', () => {
      const url = service.getPublicUrl('businesses/1/logo.webp');

      expect(url).toBe('http://localhost:9000/uploads/businesses/1/logo.webp');
    });
  });
});
