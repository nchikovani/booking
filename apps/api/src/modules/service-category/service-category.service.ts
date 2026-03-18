import { Injectable } from '@nestjs/common';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';
import type { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import type { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ServiceCategoryRepository } from './service-category.repository';

@Injectable()
export class ServiceCategoryService {
  constructor(private readonly repository: ServiceCategoryRepository) {}

  async findByBusinessId(businessId: string) {
    return this.repository.findByBusinessId(businessId);
  }

  async create(businessId: string, dto: CreateServiceCategoryDto) {
    return this.repository.create(businessId, dto.name);
  }

  async update(id: string, businessId: string, dto: UpdateServiceCategoryDto) {
    const existing = await this.repository.findById(id);
    if (!existing || existing.businessId !== businessId) {
      throw AppException.create(ErrorCode.NOT_FOUND);
    }
    return this.repository.update(id, { name: dto.name });
  }

  /**
   * Проверяет, что категория существует и принадлежит бизнесу.
   * @param errorCode — INVALID_CATEGORY для списка, NOT_FOUND для create/update
   */
  async ensureCategoryBelongsToBusiness(
    categoryId: string,
    businessId: string,
    errorCode: ErrorCode = ErrorCode.INVALID_CATEGORY,
  ): Promise<void> {
    const category = await this.repository.findById(categoryId);
    if (!category || category.businessId !== businessId) {
      throw AppException.create(errorCode);
    }
  }

  async delete(id: string, businessId: string): Promise<null> {
    const existing = await this.repository.findById(id);
    if (!existing || existing.businessId !== businessId) {
      throw AppException.create(ErrorCode.NOT_FOUND);
    }
    await this.repository.delete(id);
    return null;
  }
}
