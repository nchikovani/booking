import { Module } from '@nestjs/common';
import { AdminBusinessController } from './admin-business.controller';
import { AdminAuthModule } from '../auth/admin-auth.module';
import { BusinessModule } from '../../business/business.module';

@Module({
  imports: [AdminAuthModule, BusinessModule],
  controllers: [AdminBusinessController],
})
export class AdminBusinessModule {}
