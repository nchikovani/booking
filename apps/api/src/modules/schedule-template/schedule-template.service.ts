import { Injectable } from '@nestjs/common';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';
import { formatMinutesToTime } from '../../common/utils/time.util';
import type { ScheduleTemplateWithDays } from './schedule-template.repository';
import { ScheduleTemplateRepository } from './schedule-template.repository';
import type { CreateScheduleTemplateDto } from './dto/create-schedule-template.dto';
import type { UpdateScheduleTemplateDto } from './dto/update-schedule-template.dto';
import type { ScheduleTemplateResponseDto } from './dto/schedule-template-response.dto';

@Injectable()
export class ScheduleTemplateService {
  constructor(private readonly repository: ScheduleTemplateRepository) {}

  async findByBusinessId(businessId: string): Promise<ScheduleTemplateResponseDto[]> {
    const templates = await this.repository.findByBusinessId(businessId);
    return templates.map((t) => this.toScheduleTemplateResponse(t));
  }

  async findById(id: string, businessId: string): Promise<ScheduleTemplateResponseDto> {
    const template = await this.repository.findByIdAndBusiness(id, businessId);
    if (!template) {
      throw AppException.create(ErrorCode.NOT_FOUND);
    }
    return this.toScheduleTemplateResponse(template);
  }

  async create(
    businessId: string,
    dto: CreateScheduleTemplateDto,
  ): Promise<ScheduleTemplateResponseDto> {
    const template = await this.repository.create(businessId, {
      name: dto.name,
      days: dto.days,
    });
    return this.toScheduleTemplateResponse(template);
  }

  async update(
    id: string,
    businessId: string,
    dto: UpdateScheduleTemplateDto,
  ): Promise<ScheduleTemplateResponseDto> {
    const existing = await this.repository.findByIdAndBusiness(id, businessId);
    if (!existing) {
      throw AppException.create(ErrorCode.NOT_FOUND);
    }
    const template = await this.repository.update(id, {
      name: dto.name,
      days: dto.days,
    });
    return this.toScheduleTemplateResponse(template);
  }

  async delete(id: string, businessId: string): Promise<null> {
    const existing = await this.repository.findByIdAndBusiness(id, businessId);
    if (!existing) {
      throw AppException.create(ErrorCode.NOT_FOUND);
    }
    await this.repository.delete(id);
    return null;
  }

  toScheduleTemplateResponse(template: ScheduleTemplateWithDays): ScheduleTemplateResponseDto {
    return {
      id: template.id,
      name: template.name,
      days: template.days.map((d) => ({
        dayOfWeek: d.dayOfWeek,
        startTime: formatMinutesToTime(d.startTimeMinutes),
        endTime: formatMinutesToTime(d.endTimeMinutes),
        breaks: d.breaks.map((b) => ({
          startTime: formatMinutesToTime(b.startTimeMinutes),
          endTime: formatMinutesToTime(b.endTimeMinutes),
        })),
      })),
      createdAt: template.createdAt.toISOString(),
    };
  }
}
