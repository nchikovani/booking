import { Module } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { EmployeeService } from './employee.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  providers: [EmployeeRepository, EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
