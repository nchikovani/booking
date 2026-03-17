import { Test, TestingModule } from '@nestjs/testing';
import { BusinessRole } from '@repo/prisma';
import { BusinessService } from './business.service';
import { BusinessRepository } from './business.repository';
import { StorageService } from '../storage/storage.service';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';

describe('BusinessService', () => {
  let service: BusinessService;
  let repository: jest.Mocked<BusinessRepository>;
  let storageService: jest.Mocked<StorageService>;

  const mockBusiness = {
    id: 'business-1',
    name: 'Test Business',
    description: null,
    logoPath: null,
    imagePath: null,
    phone: null,
    email: null,
    website: null,
    telegram: null,
    vk: null,
    youtube: null,
    address: null,
    latitude: null,
    longitude: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockRepository = {
      findByAdminUser: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      checkMember: jest.fn(),
    };

    const mockStorageService = {
      getPublicUrl: jest.fn((path: string) => `https://storage.example.com/${path}`),
      upload: jest.fn().mockResolvedValue('businesses/1/logo.webp'),
      delete: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessService,
        { provide: BusinessRepository, useValue: mockRepository },
        { provide: StorageService, useValue: mockStorageService },
      ],
    }).compile();

    service = module.get(BusinessService);
    repository = module.get(BusinessRepository) as jest.Mocked<BusinessRepository>;
    storageService = module.get(StorageService) as jest.Mocked<StorageService>;

    jest.clearAllMocks();
  });

  describe('ensureBusinessForUser', () => {
    it('should create Business + BusinessMember (OWNER) when no business exists', async () => {
      repository.findByAdminUser.mockResolvedValue([]);
      repository.create.mockResolvedValue(mockBusiness);

      const result = await service.ensureBusinessForUser('user-1');

      expect(repository.findByAdminUser).toHaveBeenCalledWith('user-1');
      expect(repository.create).toHaveBeenCalledWith({ adminUserId: 'user-1' });
      expect(result).toMatchObject({
        ...mockBusiness,
        role: 'OWNER',
      });
    });

    it('should return existing business when already exists', async () => {
      const existing = { ...mockBusiness, role: BusinessRole.OWNER };
      repository.findByAdminUser.mockResolvedValue([existing]);

      const result = await service.ensureBusinessForUser('user-1');

      expect(repository.findByAdminUser).toHaveBeenCalledWith('user-1');
      expect(repository.create).not.toHaveBeenCalled();
      expect(result).toEqual(existing);
    });
  });

  describe('findByAdminUser', () => {
    it('should return list of businesses with role', async () => {
      const list = [
        { ...mockBusiness, id: 'b1', name: 'B1', logoPath: null, role: BusinessRole.OWNER },
      ];
      repository.findByAdminUser.mockResolvedValue(list);

      const result = await service.findByAdminUser('user-1');

      expect(repository.findByAdminUser).toHaveBeenCalledWith('user-1');
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: 'b1',
        name: 'B1',
        role: 'OWNER',
      });
      expect(result[0]?.logoUrl).toBeNull();
    });

    it('should return empty array when no businesses', async () => {
      repository.findByAdminUser.mockResolvedValue([]);

      const result = await service.findByAdminUser('user-1');

      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should save empty string as null', async () => {
      repository.update.mockResolvedValue({ ...mockBusiness, name: null });

      await service.update('business-1', { name: '' });

      expect(repository.update).toHaveBeenCalledWith(
        'business-1',
        expect.objectContaining({ name: null }),
      );
    });

    it('should update only passed fields', async () => {
      const updated = { ...mockBusiness, name: 'New Name', description: 'New desc' };
      repository.update.mockResolvedValue(updated);

      const result = await service.update('business-1', {
        name: 'New Name',
        description: 'New desc',
      });

      expect(repository.update).toHaveBeenCalledWith(
        'business-1',
        expect.objectContaining({
          name: 'New Name',
          description: 'New desc',
        }),
      );
      expect(result).toEqual(updated);
    });
  });

  describe('delete', () => {
    it('should delete business', async () => {
      repository.delete.mockResolvedValue(undefined);

      await service.delete('business-1');

      expect(repository.delete).toHaveBeenCalledWith('business-1');
    });
  });

  describe('findByIdPublic', () => {
    it('should return public data without createdAt/updatedAt', async () => {
      repository.findById.mockResolvedValue(mockBusiness);

      const result = await service.findByIdPublic('business-1');

      expect(result).not.toBeNull();
      expect(result).not.toHaveProperty('createdAt');
      expect(result).not.toHaveProperty('updatedAt');
      expect(result).toMatchObject({
        id: mockBusiness.id,
        name: mockBusiness.name,
        description: mockBusiness.description,
      });
    });

    it('should return null when business not found', async () => {
      repository.findById.mockResolvedValue(null);

      const result = await service.findByIdPublic('non-existent');

      expect(result).toBeNull();
    });
  });
});
