import { Test, TestingModule } from '@nestjs/testing';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';
import { EmployeeScheduleService } from './employee-schedule.service';
import { EmployeeScheduleRepository } from './employee-schedule.repository';
import { ScheduleTemplateRepository } from '../schedule-template/schedule-template.repository';

describe('EmployeeScheduleService', () => {
  let service: EmployeeScheduleService;
  let repository: jest.Mocked<EmployeeScheduleRepository>;
  let scheduleTemplateRepository: jest.Mocked<ScheduleTemplateRepository>;

  const mockScheduleWithTemplate = {
    id: 'es-1',
    employeeId: 'emp-1',
    scheduleTemplateId: 'tpl-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    days: [],
    scheduleTemplate: {
      id: 'tpl-1',
      name: 'Стандартный',
      days: [
        {
          id: 'd1',
          dayOfWeek: 1,
          startTimeMinutes: 540,
          endTimeMinutes: 1080,
          breaks: [],
        },
      ],
    },
  };

  const mockScheduleCustom = {
    id: 'es-1',
    employeeId: 'emp-1',
    scheduleTemplateId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    days: [
      {
        id: 'd1',
        dayOfWeek: 1,
        startTimeMinutes: 540,
        endTimeMinutes: 1080,
        breaks: [],
      },
    ],
    scheduleTemplate: null,
  };

  beforeEach(async () => {
    const mockRepository = {
      findByEmployeeId: jest.fn(),
      syncSchedule: jest.fn().mockResolvedValue(undefined),
    };

    const mockScheduleTemplateRepository = {
      findByIdAndBusiness: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeScheduleService,
        { provide: EmployeeScheduleRepository, useValue: mockRepository },
        { provide: ScheduleTemplateRepository, useValue: mockScheduleTemplateRepository },
      ],
    }).compile();

    service = module.get(EmployeeScheduleService);
    repository = module.get(EmployeeScheduleRepository) as jest.Mocked<EmployeeScheduleRepository>;
    scheduleTemplateRepository = module.get(
      ScheduleTemplateRepository,
    ) as jest.Mocked<ScheduleTemplateRepository>;
    jest.clearAllMocks();
  });

  describe('syncSchedule', () => {
    it('должен вызывать syncSchedule с null при schedule: null', async () => {
      await service.syncSchedule('emp-1', 'business-1', null);

      expect(repository.syncSchedule).toHaveBeenCalledWith('emp-1', null, undefined);
    });

    it('не вызывает syncSchedule при schedule: undefined', async () => {
      await service.syncSchedule('emp-1', 'business-1', undefined);

      expect(repository.syncSchedule).not.toHaveBeenCalled();
    });

    it('должен валидировать scheduleTemplateId и вызывать syncSchedule', async () => {
      scheduleTemplateRepository.findByIdAndBusiness.mockResolvedValue({
        id: 'tpl-1',
        businessId: 'business-1',
        name: 'Стандартный',
        days: [],
      } as never);

      await service.syncSchedule('emp-1', 'business-1', { scheduleTemplateId: 'tpl-1' });

      expect(scheduleTemplateRepository.findByIdAndBusiness).toHaveBeenCalledWith(
        'tpl-1',
        'business-1',
        undefined,
      );
      expect(repository.syncSchedule).toHaveBeenCalledWith(
        'emp-1',
        { scheduleTemplateId: 'tpl-1' },
        undefined,
      );
    });

    it('должен выбрасывать NOT_FOUND при невалидном scheduleTemplateId', async () => {
      scheduleTemplateRepository.findByIdAndBusiness.mockResolvedValue(null);

      await expect(
        service.syncSchedule('emp-1', 'business-1', { scheduleTemplateId: 'tpl-other' }),
      ).rejects.toMatchObject({ code: ErrorCode.NOT_FOUND });

      expect(repository.syncSchedule).not.toHaveBeenCalled();
    });

    it('должен вызывать syncSchedule с days', async () => {
      await service.syncSchedule('emp-1', 'business-1', {
        days: [{ dayOfWeek: 1, startTime: '09:00', endTime: '18:00', breaks: [] }],
      });

      expect(repository.syncSchedule).toHaveBeenCalledWith(
        'emp-1',
        { days: [{ dayOfWeek: 1, startTime: '09:00', endTime: '18:00', breaks: [] }] },
        undefined,
      );
    });
  });

  describe('validateScheduleTemplateId', () => {
    it('не выбрасывает при существующем шаблоне', async () => {
      scheduleTemplateRepository.findByIdAndBusiness.mockResolvedValue({} as never);

      await service.validateScheduleTemplateId('tpl-1', 'business-1');
    });

    it('выбрасывает NOT_FOUND при отсутствии', async () => {
      scheduleTemplateRepository.findByIdAndBusiness.mockResolvedValue(null);

      await expect(service.validateScheduleTemplateId('tpl-1', 'business-1')).rejects.toMatchObject(
        { code: ErrorCode.NOT_FOUND },
      );
    });
  });

  describe('toScheduleResponse', () => {
    it('возвращает null при null', () => {
      expect(service.toScheduleResponse(null)).toBeNull();
    });

    it('возвращает type: template при scheduleTemplateId', () => {
      const result = service.toScheduleResponse(mockScheduleWithTemplate as never);
      expect(result).toMatchObject({
        type: 'template',
        scheduleTemplateId: 'tpl-1',
        scheduleTemplateName: 'Стандартный',
        days: [{ dayOfWeek: 1, startTime: '09:00', endTime: '18:00', breaks: [] }],
      });
    });

    it('возвращает type: custom при индивидуальном графике', () => {
      const result = service.toScheduleResponse(mockScheduleCustom as never);
      expect(result).toMatchObject({
        type: 'custom',
        days: [{ dayOfWeek: 1, startTime: '09:00', endTime: '18:00', breaks: [] }],
      });
    });
  });
});
