import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@repo/prisma';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryRepository } from './service-category.repository';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';

describe('ServiceCategoryService', () => {
  let service: ServiceCategoryService;
  let repository: jest.Mocked<ServiceCategoryRepository>;

  const mockCategory = {
    id: 'cat-1',
    name: 'Стрижка',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const mockRepository = {
      findByBusinessId: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceCategoryService,
        { provide: ServiceCategoryRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(ServiceCategoryService);
    repository = module.get(ServiceCategoryRepository) as jest.Mocked<ServiceCategoryRepository>;
    jest.clearAllMocks();
  });

  describe('findByBusinessId', () => {
    it('должен возвращать список категорий', async () => {
      const list = [mockCategory, { ...mockCategory, id: 'cat-2', name: 'Окрашивание' }];
      repository.findByBusinessId.mockResolvedValue(list);

      const result = await service.findByBusinessId('business-1');

      expect(repository.findByBusinessId).toHaveBeenCalledWith('business-1');
      expect(result).toEqual(list);
    });
  });

  describe('create', () => {
    it('должен создавать категорию', async () => {
      repository.create.mockResolvedValue(mockCategory);

      const result = await service.create('business-1', { name: 'Стрижка' });

      expect(repository.create).toHaveBeenCalledWith('business-1', 'Стрижка');
      expect(result).toEqual(mockCategory);
    });

    it('должен пробрасывать P2002 при дубликате name', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError('Unique constraint', {
        code: 'P2002',
        clientVersion: '1.0',
      });
      repository.create.mockRejectedValue(prismaError);

      const err = await service.create('business-1', { name: 'Стрижка' }).catch((e) => e);
      expect(err).toBeInstanceOf(Prisma.PrismaClientKnownRequestError);
      expect(err.code).toBe('P2002');
    });
  });

  describe('update', () => {
    it('должен обновлять категорию', async () => {
      repository.findById.mockResolvedValue({
        id: 'cat-1',
        businessId: 'business-1',
        name: 'Стрижка',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      repository.update.mockResolvedValue({ ...mockCategory, name: 'Стрижка и укладка' });

      const result = await service.update('cat-1', 'business-1', { name: 'Стрижка и укладка' });

      expect(repository.findById).toHaveBeenCalledWith('cat-1');
      expect(repository.update).toHaveBeenCalledWith('cat-1', { name: 'Стрижка и укладка' });
      expect(result.name).toBe('Стрижка и укладка');
    });

    it('должен выбрасывать NOT_FOUND при чужом бизнесе', async () => {
      repository.findById.mockResolvedValue({
        id: 'cat-1',
        businessId: 'other-business',
        name: 'Стрижка',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(service.update('cat-1', 'business-1', { name: 'New' })).rejects.toThrow(
        AppException,
      );
      await expect(service.update('cat-1', 'business-1', { name: 'New' })).rejects.toMatchObject({
        code: ErrorCode.NOT_FOUND,
      });
    });
  });

  describe('delete', () => {
    it('должен удалять категорию', async () => {
      repository.findById.mockResolvedValue({
        id: 'cat-1',
        businessId: 'business-1',
        name: 'Стрижка',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      repository.delete.mockResolvedValue(undefined);

      const result = await service.delete('cat-1', 'business-1');

      expect(repository.findById).toHaveBeenCalledWith('cat-1');
      expect(repository.delete).toHaveBeenCalledWith('cat-1');
      expect(result).toEqual({ message: 'Категория удалена' });
    });

    it('должен выбрасывать NOT_FOUND при чужом бизнесе', async () => {
      repository.findById.mockResolvedValue({
        id: 'cat-1',
        businessId: 'other-business',
        name: 'Стрижка',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(service.delete('cat-1', 'business-1')).rejects.toThrow(AppException);
    });
  });
});
