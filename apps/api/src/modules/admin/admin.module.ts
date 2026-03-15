import { Module } from '@nestjs/common';
import { AdminAuthModule } from './auth/admin-auth.module';
import { AdminBusinessModule } from './business/admin-business.module';

@Module({
  imports: [AdminAuthModule, AdminBusinessModule],
})
export class AdminModule {}
