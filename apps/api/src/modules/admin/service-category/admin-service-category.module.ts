import { Module } from '@nestjs/common';
import { AdminServiceCategoryController } from './admin-service-category.controller';
import { AdminAuthModule } from '../auth/admin-auth.module';
import { BusinessModule } from '../../business/business.module';
import { ServiceCategoryModule } from '../../service-category/service-category.module';

@Module({
  imports: [AdminAuthModule, BusinessModule, ServiceCategoryModule],
  controllers: [AdminServiceCategoryController],
})
export class AdminServiceCategoryModule {}
