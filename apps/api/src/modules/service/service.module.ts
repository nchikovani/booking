import { Module } from '@nestjs/common';
import { ServiceCategoryModule } from '../service-category/service-category.module';
import { ServiceRepository } from './service.repository';
import { ServiceService } from './service.service';

@Module({
  imports: [ServiceCategoryModule],
  providers: [ServiceRepository, ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
