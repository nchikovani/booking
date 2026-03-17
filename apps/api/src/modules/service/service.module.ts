import { Module } from '@nestjs/common';
import { EmployeeModule } from '../employee/employee.module';
import { ServiceCategoryModule } from '../service-category/service-category.module';
import { ServiceRepository } from './service.repository';
import { ServiceService } from './service.service';

@Module({
  imports: [EmployeeModule, ServiceCategoryModule],
  providers: [ServiceRepository, ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
