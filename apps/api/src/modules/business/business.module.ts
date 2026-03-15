import { Module } from '@nestjs/common';
import { BusinessRepository } from './business.repository';
import { BusinessService } from './business.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  providers: [BusinessRepository, BusinessService],
  exports: [BusinessService],
})
export class BusinessModule {}
