import { Module } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { EmployeeService } from './employee.service';
import { StorageModule } from '../storage/storage.module';
import { EmployeeScheduleModule } from '../employee-schedule/employee-schedule.module';

@Module({
  imports: [StorageModule, EmployeeScheduleModule],
  providers: [EmployeeRepository, EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
