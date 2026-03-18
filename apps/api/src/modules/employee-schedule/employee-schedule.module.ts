import { Module } from '@nestjs/common';
import { EmployeeScheduleRepository } from './employee-schedule.repository';
import { EmployeeScheduleService } from './employee-schedule.service';
import { ScheduleTemplateModule } from '../schedule-template/schedule-template.module';

@Module({
  imports: [ScheduleTemplateModule],
  providers: [EmployeeScheduleRepository, EmployeeScheduleService],
  exports: [EmployeeScheduleService],
})
export class EmployeeScheduleModule {}
