import { Test, TestingModule } from '@nestjs/testing';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';
import { ScheduleTemplateService } from './schedule-template.service';
import { ScheduleTemplateRepository } from './schedule-template.repository';

describe('ScheduleTemplateService', () => {
  let service: ScheduleTemplateService;
  let repository: jest.Mocked<ScheduleTemplateRepository>;

  const mockTemplate = {
    id: 'tpl-1',
    businessId: 'business-1',
    name: 'Стандартный график',
    createdAt: new Date(),
    updatedAt: new Date(),
    days: [
      {
        id: 'day-1',
        dayOfWeek: 1,
        startTimeMinutes: 540,
        endTimeMinutes: 1080,
        breaks: [{ id: 'b1', startTimeMinutes: 780, endTimeMinutes: 840 }],
      },
    ],
  };

  beforeEach(async () => {
    const mockRepository = {
      findByBusinessId: jest.fn(),
      findById: jest.fn(),
      findByIdAndBusiness: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleTemplateService,
        { provide: ScheduleTemplateRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(ScheduleTemplateService);
    repository = module.get(ScheduleTemplateRepository) as jest.Mocked<ScheduleTemplateRepository>;
    jest.clearAllMocks();
  });

  describe('findByBusinessId', () => {
    it('должен возвращать список шаблонов', async () => {
      const list = [mockTemplate];
      repository.findByBusinessId.mockResolvedValue(list);

      const result = await service.findByBusinessId('business-1');

      expect(repository.findByBusinessId).toHaveBeenCalledWith('business-1');
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: 'tpl-1',
        name: 'Стандартный график',
        days: [
          {
            dayOfWeek: 1,
            startTime: '09:00',
            endTime: '18:00',
            breaks: [{ startTime: '13:00', endTime: '14:00' }],
          },
        ],
      });
    });
  });

  describe('findById', () => {
    it('должен возвращать шаблон', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockTemplate);

      const result = await service.findById('tpl-1', 'business-1');

      expect(repository.findByIdAndBusiness).toHaveBeenCalledWith('tpl-1', 'business-1');
      expect(result.id).toBe('tpl-1');
      expect(result.days[0]?.startTime).toBe('09:00');
    });

    it('должен выбрасывать NOT_FOUND при отсутствии', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(null);

      await expect(service.findById('tpl-1', 'business-1')).rejects.toMatchObject({
        code: ErrorCode.NOT_FOUND,
      });
    });
  });

  describe('create', () => {
    it('должен создавать шаблон', async () => {
      repository.create.mockResolvedValue(mockTemplate);

      const result = await service.create('business-1', {
        name: 'Стандартный график',
        days: [
          {
            dayOfWeek: 1,
            startTime: '09:00',
            endTime: '18:00',
            breaks: [{ startTime: '13:00', endTime: '14:00' }],
          },
        ],
      });

      expect(repository.create).toHaveBeenCalledWith('business-1', {
        name: 'Стандартный график',
        days: expect.any(Array),
      });
      expect(result.id).toBe('tpl-1');
    });
  });

  describe('update', () => {
    it('должен обновлять шаблон', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockTemplate);
      repository.update.mockResolvedValue({
        ...mockTemplate,
        name: 'Обновлённый график',
      });

      const result = await service.update('tpl-1', 'business-1', {
        name: 'Обновлённый график',
      });

      expect(repository.update).toHaveBeenCalledWith('tpl-1', { name: 'Обновлённый график' });
      expect(result.name).toBe('Обновлённый график');
    });

    it('должен выбрасывать NOT_FOUND при чужом бизнесе', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(null);

      await expect(service.update('tpl-1', 'business-1', { name: 'New' })).rejects.toThrow(
        AppException,
      );
    });
  });

  describe('delete', () => {
    it('должен удалять шаблон', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(mockTemplate);
      repository.delete.mockResolvedValue(undefined);

      const result = await service.delete('tpl-1', 'business-1');

      expect(repository.delete).toHaveBeenCalledWith('tpl-1');
      expect(result).toBeNull();
    });

    it('должен выбрасывать NOT_FOUND при отсутствии', async () => {
      repository.findByIdAndBusiness.mockResolvedValue(null);

      await expect(service.delete('tpl-1', 'business-1')).rejects.toThrow(AppException);
    });
  });
});
