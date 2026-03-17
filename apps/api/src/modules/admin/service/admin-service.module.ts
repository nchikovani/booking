import { Module } from '@nestjs/common';
import { AdminServiceController } from './admin-service.controller';
import { AdminAuthModule } from '../auth/admin-auth.module';
import { BusinessModule } from '../../business/business.module';
import { ServiceModule } from '../../service/service.module';

@Module({
  imports: [AdminAuthModule, BusinessModule, ServiceModule],
  controllers: [AdminServiceController],
})
export class AdminServiceModule {}
