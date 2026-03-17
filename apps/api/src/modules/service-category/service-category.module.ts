import { Module } from '@nestjs/common';
import { ServiceCategoryRepository } from './service-category.repository';
import { ServiceCategoryService } from './service-category.service';

@Module({
  providers: [ServiceCategoryRepository, ServiceCategoryService],
  exports: [ServiceCategoryService],
})
export class ServiceCategoryModule {}
