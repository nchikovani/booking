import { Injectable, Logger } from '@nestjs/common';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';
import { formatMinutesToTime } from '../../common/utils/time.util';
import type { ScheduleDto } from './dto/schedule.dto';
import type { EmployeeScheduleWithDetails } from './employee-schedule.repository';
import { EmployeeScheduleRepository } from './employee-schedule.repository';
import { ScheduleTemplateRepository } from '../schedule-template/schedule-template.repository';
import type { Prisma } from '@repo/prisma';

type TransactionClient = Prisma.TransactionClient;

export interface ScheduleResponse {
  type: 'template' | 'custom';
  scheduleTemplateId?: string;
  scheduleTemplateName?: string;
  days: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    breaks: Array<{ startTime: string; endTime: string }>;
  }>;
}

@Injectable()
export class EmployeeScheduleService {
  private readonly logger = new Logger(EmployeeScheduleService.name);

  constructor(
    private readonly repository: EmployeeScheduleRepository,
    private readonly scheduleTemplateRepository: ScheduleTemplateRepository,
  ) {}

  async syncSchedule(
    employeeId: string,
    businessId: string,
    schedule: ScheduleDto | null | undefined,
    tx?: TransactionClient,
  ): Promise<void> {
    if (schedule === undefined) return;
    if (schedule === null) {
      await this.repository.syncSchedule(employeeId, null, tx);
      return;
    }
    if (schedule.scheduleTemplateId) {
      await this.validateScheduleTemplateId(schedule.scheduleTemplateId, businessId, tx);
    }
    await this.repository.syncSchedule(employeeId, schedule, tx);
  }

  async validateScheduleTemplateId(
    templateId: string,
    businessId: string,
    tx?: TransactionClient,
  ): Promise<void> {
    const template = await this.scheduleTemplateRepository.findByIdAndBusiness(
      templateId,
      businessId,
      tx,
    );
    if (!template) {
      throw AppException.create(ErrorCode.NOT_FOUND);
    }
  }

  toScheduleResponse(
    employeeSchedule: EmployeeScheduleWithDetails | null,
  ): ScheduleResponse | null {
    if (!employeeSchedule) return null;

    if (employeeSchedule.scheduleTemplateId && employeeSchedule.scheduleTemplate) {
      const template = employeeSchedule.scheduleTemplate;
      return {
        type: 'template',
        scheduleTemplateId: template.id,
        scheduleTemplateName: template.name,
        days: template.days.map((d) => ({
          dayOfWeek: d.dayOfWeek,
          startTime: formatMinutesToTime(d.startTimeMinutes),
          endTime: formatMinutesToTime(d.endTimeMinutes),
          breaks: d.breaks.map((b) => ({
            startTime: formatMinutesToTime(b.startTimeMinutes),
            endTime: formatMinutesToTime(b.endTimeMinutes),
          })),
        })),
      };
    }

    if (employeeSchedule.scheduleTemplateId && !employeeSchedule.scheduleTemplate) {
      this.logger.warn(
        `EmployeeSchedule ${employeeSchedule.id}: scheduleTemplateId set but scheduleTemplate is null (data integrity issue)`,
      );
    }

    return {
      type: 'custom',
      days: employeeSchedule.days.map((d) => ({
        dayOfWeek: d.dayOfWeek,
        startTime: formatMinutesToTime(d.startTimeMinutes),
        endTime: formatMinutesToTime(d.endTimeMinutes),
        breaks: d.breaks.map((b) => ({
          startTime: formatMinutesToTime(b.startTimeMinutes),
          endTime: formatMinutesToTime(b.endTimeMinutes),
        })),
      })),
    };
  }
}
