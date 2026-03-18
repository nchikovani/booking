import { Module } from '@nestjs/common';
import { ScheduleTemplateRepository } from './schedule-template.repository';
import { ScheduleTemplateService } from './schedule-template.service';

@Module({
  providers: [ScheduleTemplateRepository, ScheduleTemplateService],
  exports: [ScheduleTemplateService, ScheduleTemplateRepository],
})
export class ScheduleTemplateModule {}
