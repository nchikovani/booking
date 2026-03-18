import { Module } from '@nestjs/common';
import { AdminAuthModule } from './auth/admin-auth.module';
import { AdminBusinessModule } from './business/admin-business.module';
import { AdminEmployeeModule } from './employee/admin-employee.module';
import { AdminScheduleTemplateModule } from './schedule-template/admin-schedule-template.module';
import { AdminServiceCategoryModule } from './service-category/admin-service-category.module';
import { AdminServiceModule } from './service/admin-service.module';

@Module({
  imports: [
    AdminAuthModule,
    AdminBusinessModule,
    AdminEmployeeModule,
    AdminScheduleTemplateModule,
    AdminServiceCategoryModule,
    AdminServiceModule,
  ],
})
export class AdminModule {}
