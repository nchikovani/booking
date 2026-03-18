import { Module } from '@nestjs/common';
import { AdminScheduleTemplateController } from './admin-schedule-template.controller';
import { AdminAuthModule } from '../auth/admin-auth.module';
import { BusinessModule } from '../../business/business.module';
import { ScheduleTemplateModule } from '../../schedule-template/schedule-template.module';

@Module({
  imports: [AdminAuthModule, BusinessModule, ScheduleTemplateModule],
  controllers: [AdminScheduleTemplateController],
})
export class AdminScheduleTemplateModule {}
