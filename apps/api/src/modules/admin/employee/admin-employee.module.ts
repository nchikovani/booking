import { Module } from '@nestjs/common';
import { AdminEmployeeController } from './admin-employee.controller';
import { AdminAuthModule } from '../auth/admin-auth.module';
import { BusinessModule } from '../../business/business.module';
import { EmployeeModule } from '../../employee/employee.module';

@Module({
  imports: [AdminAuthModule, BusinessModule, EmployeeModule],
  controllers: [AdminEmployeeController],
})
export class AdminEmployeeModule {}
