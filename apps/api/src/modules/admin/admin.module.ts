import { Module } from '@nestjs/common';
import { AdminAuthModule } from './auth/admin-auth.module';
import { AdminBusinessModule } from './business/admin-business.module';
import { AdminServiceCategoryModule } from './service-category/admin-service-category.module';
import { AdminServiceModule } from './service/admin-service.module';

@Module({
  imports: [AdminAuthModule, AdminBusinessModule, AdminServiceCategoryModule, AdminServiceModule],
})
export class AdminModule {}
