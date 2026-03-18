import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@repo/prisma';
import { ServiceService } from './service.service';
import { ServiceRepository } from './service.repository';
import { ServiceCategoryService } from '../service-category/service-category.service';
import { EmployeeService } from '../employee/employee.service';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';
import { encodeCursor } from '../../common/utils/cursor.util';

describe('ServiceService', () => {
  let service: ServiceService;
  let repository: jest.Mocked<ServiceRepository>;
  let serviceCategoryService: jest.Mocked<ServiceCategoryService>;
  let employeeService: jest.Mocked<EmployeeService>;

  const mockService = {
    id: 'svc-1',
    businessId: 'business-1',
    categoryId: 'cat-1',
    name: 'Мужская стрижка',
    description: 'Классическая стрижка',
    price: new Prisma.Decimal(1500),
    durationMinutes: 60,
    breakAfterMinutes: 0,
    position: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: { id: 'cat-1', name: 'Стрижка' },
    employeeServices: [] as { employeeId: string }[],
  };

  beforeEach(async () => {
    const mockRepository = {
      findByBusinessId: jest.fn(),
      findByIdAndBusiness: jest.fn(),
      create: jest.fn(),
      createWithEmployeeLinks: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getMaxPosition: jest.fn(),
      getMinPosition: jest.fn(),
      getNextServiceAfter: jest.fn(),
      rebalancePositions: jest.fn(),
    };

    const mockCategoryService = {
      ensureCategoryBelongsToBusiness: jest.fn(),
    };

    const mockEmployeeService = {
      validateEmployeeIdsBelongToBusiness: jest.fn().mockResolvedValue(undefined),
      syncServiceEmployeeLinks: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceService,
        { provide: ServiceRepository, useValue: mockRepository },
        { provide: ServiceCategoryService, useValue: mockCategoryService },
        { provide: EmployeeService, useValue: mockEmployeeService },
      ],
    }).compile();

    service = module.get(ServiceService);
    repository = module.get(ServiceRepository) as jest.Mocked<ServiceRepository>;
    serviceCategoryService = module.get(
      ServiceCategoryService,
    ) as jest.Mocked<ServiceCategoryService>;
    employeeService = module.get(EmployeeService) as jest.Mocked<EmployeeService>;
    jest.clearAllMocks();
  });

  describe('findPaginated', () => {
    it('должен возвращать items и nextCursor с cursor, limit, sort, search, categoryId', async () => {
      serviceCategoryService.ensureCategoryBelongsToBusiness.mockResolvedValue(undefined);
      const items = [mockService, { ...mockService, id: 'svc-2', position: 200 }];
      repository.findByBusinessId.mockResolvedValue({ items, hasMore: true });

      const result = await service.findPaginated('business-1', {
        cursor: encodeCursor('svc-0'),
        limit: 2,
        sort: 'position',
        search: 'стрижка',
        categoryId: 'cat-1',
      });

      expect(serviceCategoryService.ensureCategoryBelongsToBusiness).toHaveBeenCalledWith(
        'cat-1',
        'business-1',
        ErrorCode.INVALID_CATEGORY,
      );
      expect(repository.findByBusinessId).toHaveBeenCalledWith(
        'business-1',
        expect.objectContaining({
          cursorId: 'svc-0',
          limit: 2,
          sort: 'position',
          search: 'стрижка',
          categoryId: 'cat-1',
        }),
      );
      expect(result.items).toHaveLength(2);
      expect(result.nextCursor).toBe(encodeCursor('svc-2'));
    });

    it('должен выбрасывать INVALID_CURSOR при невалидном cursor', async () => {
      await expect(
        service.findPaginated('business-1', { cursor: 'invalid-base64!!!' }),
      ).rejects.toMatchObject({ code: ErrorCode.INVALID_CURSOR });
    });

    it('должен выбрасывать INVALID_CATEGORY при categoryId другого бизнеса', async () => {
      serviceCategoryService.ensureCategoryBelongsToBusiness.mockRejectedValue(
        AppException.create(ErrorCode.INVALID_CATEGORY),
      );

      await expect(
        service.findPaginated('business-1', { categoryId: 'cat-other' }),
      ).rejects.toMatchObject({ code: ErrorCode.INVALID_CATEGORY });
    });
  });

  describe('create', () => {
    it('должен создавать услугу', async () => {
      serviceCategoryService.ensureCategoryBelongsToBusiness.mockResolvedValue(undefined);
      repository.create.mockResolvedValue(mockService);

      const result = await service.create('business-1', {
        name: 'Мужская стрижка',
        description: 'Классическая',
        price: 1500,
        durationMinutes: 60,
        breakAfterMinutes: 0,
        categoryId: 'cat-1',
      });

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          businessId: 'business-1',
          name: 'Мужская стрижка',
          price: 1500,
          durationMinutes: 60,
          categoryId: 'cat-1',
        }),
      );
      expect(result.id).toBe('svc-1');
      expect(result.price).toBe('1500.00');
    });

    it('должен создавать услугу с employeeServices атомарно через createWithEmployeeLinks', async () => {
      serviceCategoryService.ensureCategoryBelongsToBusiness.mockResolvedValue(undefined);
      const serviceWithEmployees = {
        ...mockService,
        employeeServices: [
          { employeeId: 'emp-1', priceOverride: null, durationMinutesOverride: null },
          { employeeId: 'emp-2', priceOverride: null, durationMinutesOverride: null },
        ],
      };
      repository.createWithEmployeeLinks.mockResolvedValue(serviceWithEmployees);

      const result = await service.create('business-1', {
        name: 'Стрижка',
        price: 1500,
        durationMinutes: 30,
        employeeServices: [{ employeeId: 'emp-1' }, { employeeId: 'emp-2' }],
      });

      expect(repository.create).not.toHaveBeenCalled();
      expect(repository.createWithEmployeeLinks).toHaveBeenCalledWith(
        expect.objectContaining({
          businessId: 'business-1',
          name: 'Стрижка',
          price: 1500,
          durationMinutes: 30,
        }),
        [
          { employeeId: 'emp-1', priceOverride: undefined, durationMinutesOverride: undefined },
          { employeeId: 'emp-2', priceOverride: undefined, durationMinutesOverride: undefined },
        ],
      );
      expect(employeeService.validateEmployeeIdsBelongToBusiness).not.toHaveBeenCalled();
      expect(employeeService.syncServiceEmployeeLinks).not.toHaveBeenCalled();
      expect(result.employeeServices.map((s) => s.employeeId)).toEqual(['emp-1', 'emp-2']);
    });
  });

  describe('update', () => {
    it('должен обновлять услугу', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockService);
      serviceCategoryService.ensureCategoryBelongsToBusiness.mockResolvedValue(undefined);
      repository.update.mockResolvedValue({ ...mockService, name: 'Обновлённая стрижка' });

      const result = await service.update('svc-1', 'business-1', { name: 'Обновлённая стрижка' });

      expect(repository.update).toHaveBeenCalledWith(
        'svc-1',
        expect.objectContaining({ name: 'Обновлённая стрижка' }),
      );
      expect(result.name).toBe('Обновлённая стрижка');
    });

    it('должен возвращать текущие данные при пустом body', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockService);

      const result = await service.update('svc-1', 'business-1', {});

      expect(repository.update).not.toHaveBeenCalled();
      expect(result.id).toBe('svc-1');
    });

    it('должен вызывать syncServiceEmployeeLinks при employeeServices в dto', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockService);

      await service.update('svc-1', 'business-1', {
        employeeServices: [{ employeeId: 'emp-1' }],
      });

      expect(employeeService.syncServiceEmployeeLinks).toHaveBeenCalledWith(
        'svc-1',
        [{ employeeId: 'emp-1', priceOverride: undefined, durationMinutesOverride: undefined }],
        'business-1',
      );
    });
  });

  describe('delete', () => {
    it('должен удалять услугу', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockService);
      repository.delete.mockResolvedValue(undefined);

      const result = await service.delete('svc-1', 'business-1');

      expect(repository.delete).toHaveBeenCalledWith('svc-1');
      expect(result).toBeNull();
    });

    it('должен выбрасывать NOT_FOUND при отсутствии услуги', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(null);

      await expect(service.delete('svc-1', 'business-1')).rejects.toMatchObject({
        code: ErrorCode.NOT_FOUND,
      });
    });
  });

  describe('reorder', () => {
    it('должен возвращать услугу идемпотентно при afterServiceId === id', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockService);

      const result = await service.reorder('svc-1', 'business-1', { afterServiceId: 'svc-1' });

      expect(repository.update).not.toHaveBeenCalled();
      expect(result.id).toBe('svc-1');
    });

    it('должен вставлять после afterServiceId', async () => {
      repository.findByIdAndBusiness
        .mockResolvedValueOnce(mockService)
        .mockResolvedValueOnce({ ...mockService, id: 'svc-2', position: 200 });
      repository.getNextServiceAfter.mockResolvedValue(null);
      repository.getMaxPosition.mockResolvedValue(200);
      repository.update.mockResolvedValue({ ...mockService, position: 300 });

      const result = await service.reorder('svc-1', 'business-1', { afterServiceId: 'svc-2' });

      expect(repository.update).toHaveBeenCalledWith('svc-1', { position: 300 });
      expect(result.position).toBe(300);
    });

    it('должен вставлять в начало при отсутствии afterServiceId', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockService);
      repository.getMinPosition.mockResolvedValue(100);
      repository.update.mockResolvedValue({ ...mockService, position: 0 });

      const result = await service.reorder('svc-1', 'business-1', {});

      expect(repository.update).toHaveBeenCalledWith('svc-1', { position: 0 });
      expect(result.position).toBe(0);
    });

    it('должен выбрасывать NOT_FOUND при afterServiceId другого бизнеса', async () => {
      repository.findByIdAndBusiness.mockResolvedValueOnce(mockService).mockResolvedValueOnce(null);

      await expect(
        service.reorder('svc-1', 'business-1', { afterServiceId: 'svc-other' }),
      ).rejects.toMatchObject({ code: ErrorCode.NOT_FOUND });
    });
  });
});
