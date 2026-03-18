import { Test, TestingModule } from '@nestjs/testing';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from './employee.repository';
import { StorageService } from '../storage/storage.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let repository: jest.Mocked<EmployeeRepository>;
  let storageService: jest.Mocked<StorageService>;

  const mockEmployee = {
    id: 'emp-1',
    businessId: 'business-1',
    name: 'Анна Иванова',
    specialization: 'Мастер маникюра',
    imagePath: null as string | null,
    createdAt: new Date(),
    updatedAt: new Date(),
    employeeServices: [] as {
      serviceId: string;
      priceOverride?: unknown;
      durationMinutesOverride?: number | null;
    }[],
  };

  beforeEach(async () => {
    const mockRepository = {
      findByBusinessId: jest.fn(),
      findById: jest.fn(),
      findByIdAndBusiness: jest.fn(),
      findByIdsAndBusiness: jest.fn(),
      create: jest.fn(),
      createWithServiceLinks: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      syncEmployeeServiceLinks: jest.fn(),
      syncServiceEmployeeLinks: jest.fn(),
      validateServiceIdsBelongToBusiness: jest.fn(),
    };

    const mockStorageService = {
      getPublicUrl: jest.fn((path: string) => `https://storage.example.com/${path}`),
      upload: jest.fn().mockResolvedValue('employees/emp-1/photo.webp'),
      delete: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        { provide: EmployeeRepository, useValue: mockRepository },
        { provide: StorageService, useValue: mockStorageService },
      ],
    }).compile();

    service = module.get(EmployeeService);
    repository = module.get(EmployeeRepository) as jest.Mocked<EmployeeRepository>;
    storageService = module.get(StorageService) as jest.Mocked<StorageService>;

    jest.clearAllMocks();
  });

  describe('findByBusinessId', () => {
    it('должен возвращать список сотрудников', async () => {
      const items = [mockEmployee, { ...mockEmployee, id: 'emp-2', name: 'Борис Петров' }];
      repository.findByBusinessId.mockResolvedValue(items);

      const result = await service.findByBusinessId('business-1', { sort: 'name' });

      expect(repository.findByBusinessId).toHaveBeenCalledWith('business-1', {
        search: undefined,
        sort: 'name',
      });
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        id: 'emp-1',
        name: 'Анна Иванова',
        specialization: 'Мастер маникюра',
        services: [],
      });
    });

    it('должен передавать search и sort в репозиторий', async () => {
      repository.findByBusinessId.mockResolvedValue([]);

      await service.findByBusinessId('business-1', {
        search: 'Анна',
        sort: '-name',
      });

      expect(repository.findByBusinessId).toHaveBeenCalledWith('business-1', {
        search: 'Анна',
        sort: '-name',
      });
    });

    it('не включает updatedAt в ответе списка (spec 6.1)', async () => {
      repository.findByBusinessId.mockResolvedValue([mockEmployee]);

      const result = await service.findByBusinessId('business-1', { sort: 'name' });

      expect(result[0]).not.toHaveProperty('updatedAt');
      expect(result[0]).toMatchObject({
        id: 'emp-1',
        name: 'Анна Иванова',
        createdAt: expect.any(String),
      });
    });
  });

  describe('findById', () => {
    it('должен возвращать сотрудника с updatedAt (spec 6.2)', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockEmployee);

      const result = await service.findById('emp-1', 'business-1');

      expect(repository.findByIdAndBusiness).toHaveBeenCalledWith('emp-1', 'business-1');
      expect(result).toMatchObject({
        id: 'emp-1',
        name: 'Анна Иванова',
        services: [],
      });
      expect(result).toHaveProperty('updatedAt');
    });

    it('должен выбрасывать NOT_FOUND при отсутствии', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(null);

      await expect(service.findById('emp-1', 'business-1')).rejects.toMatchObject({
        code: ErrorCode.NOT_FOUND,
      });
    });
  });

  describe('create', () => {
    it('должен создавать сотрудника без services', async () => {
      repository.createWithServiceLinks.mockResolvedValue(mockEmployee);

      const result = await service.create('business-1', {
        name: 'Анна Иванова',
        specialization: 'Мастер маникюра',
      });

      expect(repository.validateServiceIdsBelongToBusiness).not.toHaveBeenCalled();
      expect(repository.createWithServiceLinks).toHaveBeenCalledWith(
        {
          businessId: 'business-1',
          name: 'Анна Иванова',
          specialization: 'Мастер маникюра',
        },
        [],
      );
      expect(result.id).toBe('emp-1');
    });

    it('должен создавать сотрудника с services', async () => {
      const withServices = {
        ...mockEmployee,
        employeeServices: [
          { serviceId: 'svc-1', priceOverride: null, durationMinutesOverride: null },
          { serviceId: 'svc-2', priceOverride: null, durationMinutesOverride: null },
        ],
      };
      repository.validateServiceIdsBelongToBusiness.mockResolvedValue(true);
      repository.createWithServiceLinks.mockResolvedValue(withServices);

      const result = await service.create('business-1', {
        name: 'Анна Иванова',
        services: [{ serviceId: 'svc-1' }, { serviceId: 'svc-2' }],
      });

      expect(repository.validateServiceIdsBelongToBusiness).toHaveBeenCalledWith(
        ['svc-1', 'svc-2'],
        'business-1',
      );
      expect(repository.createWithServiceLinks).toHaveBeenCalledWith(
        expect.objectContaining({ businessId: 'business-1', name: 'Анна Иванова' }),
        [
          { serviceId: 'svc-1', priceOverride: undefined, durationMinutesOverride: undefined },
          { serviceId: 'svc-2', priceOverride: undefined, durationMinutesOverride: undefined },
        ],
      );
      expect(result.services).toHaveLength(2);
      expect(result.services.map((s) => s.serviceId)).toEqual(['svc-1', 'svc-2']);
    });

    it('должен выбрасывать NOT_FOUND при невалидном serviceId', async () => {
      repository.validateServiceIdsBelongToBusiness.mockResolvedValue(false);

      await expect(
        service.create('business-1', {
          name: 'Анна',
          services: [{ serviceId: 'svc-other-business' }],
        }),
      ).rejects.toMatchObject({ code: ErrorCode.NOT_FOUND });

      expect(repository.createWithServiceLinks).not.toHaveBeenCalled();
    });

    it('должен дедуплицировать services', async () => {
      repository.validateServiceIdsBelongToBusiness.mockResolvedValue(true);
      repository.createWithServiceLinks.mockResolvedValue({
        ...mockEmployee,
        employeeServices: [
          { serviceId: 'svc-1', priceOverride: null, durationMinutesOverride: null },
        ],
      });

      await service.create('business-1', {
        name: 'Анна',
        services: [{ serviceId: 'svc-1' }, { serviceId: 'svc-1' }, { serviceId: 'svc-1' }],
      });

      expect(repository.validateServiceIdsBelongToBusiness).toHaveBeenCalledWith(
        ['svc-1'],
        'business-1',
      );
    });
  });

  describe('update', () => {
    it('должен обновлять сотрудника', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockEmployee);
      repository.update.mockResolvedValue({
        ...mockEmployee,
        name: 'Анна Обновлённая',
      });

      const result = await service.update('emp-1', 'business-1', { name: 'Анна Обновлённая' });

      expect(repository.update).toHaveBeenCalledWith(
        'emp-1',
        expect.objectContaining({ name: 'Анна Обновлённая' }),
      );
      expect(result.name).toBe('Анна Обновлённая');
    });

    it('должен синхронизировать services при передаче', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockEmployee);
      repository.validateServiceIdsBelongToBusiness.mockResolvedValue(true);
      repository.syncEmployeeServiceLinks.mockResolvedValue(undefined);

      await service.update('emp-1', 'business-1', {
        services: [{ serviceId: 'svc-1' }, { serviceId: 'svc-2' }],
      });

      expect(repository.syncEmployeeServiceLinks).toHaveBeenCalledWith('emp-1', [
        { serviceId: 'svc-1', priceOverride: undefined, durationMinutesOverride: undefined },
        { serviceId: 'svc-2', priceOverride: undefined, durationMinutesOverride: undefined },
      ]);
    });

    it('должен удалять все связи при services: []', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockEmployee);
      repository.syncEmployeeServiceLinks.mockResolvedValue(undefined);

      await service.update('emp-1', 'business-1', { services: [] });

      expect(repository.syncEmployeeServiceLinks).toHaveBeenCalledWith('emp-1', []);
    });

    it('не вызывает syncEmployeeServiceLinks при PATCH без services (TC-8a)', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockEmployee);
      repository.update.mockResolvedValue({
        ...mockEmployee,
        name: 'Обновлённое имя',
      });

      await service.update('emp-1', 'business-1', { name: 'Обновлённое имя' });

      expect(repository.syncEmployeeServiceLinks).not.toHaveBeenCalled();
      expect(repository.update).toHaveBeenCalledWith(
        'emp-1',
        expect.objectContaining({ name: 'Обновлённое имя' }),
      );
    });

    it('должен выбрасывать NOT_FOUND при отсутствии', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(null);

      await expect(service.update('emp-1', 'business-1', { name: 'New' })).rejects.toMatchObject({
        code: ErrorCode.NOT_FOUND,
      });
    });
  });

  describe('delete', () => {
    it('должен удалять сотрудника и фото', async () => {
      repository.findByIdAndBusiness.mockResolvedValue({
        ...mockEmployee,
        imagePath: 'employees/emp-1/photo.webp',
      });
      repository.delete.mockResolvedValue(undefined);

      const result = await service.delete('emp-1', 'business-1');

      expect(storageService.delete).toHaveBeenCalledWith('employees/emp-1/photo.webp');
      expect(repository.delete).toHaveBeenCalledWith('emp-1');
      expect(result).toEqual({ message: 'Сотрудник удалён' });
    });

    it('должен удалять без вызова storage при отсутствии фото', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockEmployee);
      repository.delete.mockResolvedValue(undefined);

      await service.delete('emp-1', 'business-1');

      expect(storageService.delete).not.toHaveBeenCalled();
      expect(repository.delete).toHaveBeenCalledWith('emp-1');
    });
  });

  describe('uploadPhoto', () => {
    it('должен загружать фото', async () => {
      const buffer = Buffer.from('fake-image');
      repository.findByIdAndBusiness.mockResolvedValue(mockEmployee);
      storageService.upload.mockResolvedValue('employees/emp-1/photo.webp');
      repository.update.mockResolvedValue({
        ...mockEmployee,
        imagePath: 'employees/emp-1/photo.webp',
      });

      const result = await service.uploadPhoto('emp-1', 'business-1', buffer);

      expect(storageService.upload).toHaveBeenCalledWith(buffer, 'employees/emp-1/photo.webp');
      expect(repository.update).toHaveBeenCalledWith('emp-1', {
        imagePath: 'employees/emp-1/photo.webp',
      });
      expect(result.url).toContain('employees/emp-1/photo.webp');
    });

    it('должен удалять старое фото перед загрузкой нового', async () => {
      const buffer = Buffer.from('fake-image');
      repository.findByIdAndBusiness.mockResolvedValue({
        ...mockEmployee,
        imagePath: 'employees/emp-1/old.webp',
      });
      storageService.upload.mockResolvedValue('employees/emp-1/photo.webp');

      await service.uploadPhoto('emp-1', 'business-1', buffer);

      expect(storageService.delete).toHaveBeenCalledWith('employees/emp-1/old.webp');
    });
  });

  describe('deletePhoto', () => {
    it('должен удалять фото', async () => {
      repository.findByIdAndBusiness.mockResolvedValue({
        ...mockEmployee,
        imagePath: 'employees/emp-1/photo.webp',
      });

      await service.deletePhoto('emp-1', 'business-1');

      expect(storageService.delete).toHaveBeenCalledWith('employees/emp-1/photo.webp');
      expect(repository.update).toHaveBeenCalledWith('emp-1', { imagePath: null });
    });

    it('должен возвращать 200 при отсутствии фото (идемпотентно)', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockEmployee);

      await service.deletePhoto('emp-1', 'business-1');

      expect(storageService.delete).not.toHaveBeenCalled();
      expect(repository.update).toHaveBeenCalledWith('emp-1', { imagePath: null });
    });
  });

  describe('validateEmployeeIdsBelongToBusiness', () => {
    it('не выбрасывает при пустом массиве', async () => {
      await service.validateEmployeeIdsBelongToBusiness([], 'business-1');
      expect(repository.findByIdsAndBusiness).not.toHaveBeenCalled();
    });

    it('не выбрасывает при всех валидных id', async () => {
      repository.findByIdsAndBusiness.mockResolvedValue([
        { ...mockEmployee, id: 'emp-1' },
        { ...mockEmployee, id: 'emp-2' },
      ]);

      await service.validateEmployeeIdsBelongToBusiness(['emp-1', 'emp-2'], 'business-1');

      expect(repository.findByIdsAndBusiness).toHaveBeenCalledWith(
        ['emp-1', 'emp-2'],
        'business-1',
      );
    });

    it('выбрасывает NOT_FOUND при невалидном id', async () => {
      repository.findByIdsAndBusiness.mockResolvedValue([mockEmployee]);

      await expect(
        service.validateEmployeeIdsBelongToBusiness(['emp-1', 'emp-other'], 'business-1'),
      ).rejects.toMatchObject({ code: ErrorCode.NOT_FOUND });

      expect(repository.findByIdsAndBusiness).toHaveBeenCalledWith(
        ['emp-1', 'emp-other'],
        'business-1',
      );
    });

    it('дедуплицирует id перед проверкой', async () => {
      repository.findByIdsAndBusiness.mockResolvedValue([mockEmployee]);

      await service.validateEmployeeIdsBelongToBusiness(['emp-1', 'emp-1'], 'business-1');

      expect(repository.findByIdsAndBusiness).toHaveBeenCalledWith(['emp-1'], 'business-1');
    });
  });

  describe('syncServiceEmployeeLinks', () => {
    it('должен синхронизировать связи', async () => {
      repository.findByIdsAndBusiness.mockResolvedValue([
        { ...mockEmployee, id: 'emp-1' },
        { ...mockEmployee, id: 'emp-2' },
      ]);
      repository.syncServiceEmployeeLinks.mockResolvedValue(undefined);

      await service.syncServiceEmployeeLinks(
        'svc-1',
        [{ employeeId: 'emp-1' }, { employeeId: 'emp-2' }],
        'business-1',
      );

      expect(repository.findByIdsAndBusiness).toHaveBeenCalledWith(
        ['emp-1', 'emp-2'],
        'business-1',
      );
      expect(repository.syncServiceEmployeeLinks).toHaveBeenCalledWith('svc-1', [
        { employeeId: 'emp-1', priceOverride: undefined, durationMinutesOverride: undefined },
        { employeeId: 'emp-2', priceOverride: undefined, durationMinutesOverride: undefined },
      ]);
    });

    it('должен выбрасывать NOT_FOUND при невалидном employeeId', async () => {
      repository.findByIdsAndBusiness.mockResolvedValue([mockEmployee]);

      await expect(
        service.syncServiceEmployeeLinks(
          'svc-1',
          [{ employeeId: 'emp-1' }, { employeeId: 'emp-other' }],
          'business-1',
        ),
      ).rejects.toMatchObject({ code: ErrorCode.NOT_FOUND });

      expect(repository.syncServiceEmployeeLinks).not.toHaveBeenCalled();
    });
  });
});
