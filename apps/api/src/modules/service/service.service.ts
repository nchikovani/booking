import { Injectable } from '@nestjs/common';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';
import { decodeCursor, encodeCursor } from '../../common/utils/cursor.util';
import type { CreateServiceDto } from './dto/create-service.dto';
import type { UpdateServiceDto } from './dto/update-service.dto';
import type { ServiceListQueryDto } from './dto/service-list-query.dto';
import { ServiceCategoryService } from '../service-category/service-category.service';
import { ServiceRepository } from './service.repository';
import type { ServiceWithCategory } from './service.repository';

export interface ServiceResponse {
  id: string;
  name: string;
  description: string | null;
  price: string;
  durationMinutes: number;
  breakAfterMinutes: number;
  categoryId: string | null;
  categoryName: string | null;
  position: number;
  createdAt: string;
}

@Injectable()
export class ServiceService {
  constructor(
    private readonly repository: ServiceRepository,
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  private toServiceResponse(service: ServiceWithCategory): ServiceResponse {
    return {
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price.toFixed(2),
      durationMinutes: service.durationMinutes,
      breakAfterMinutes: service.breakAfterMinutes ?? 0,
      categoryId: service.categoryId,
      categoryName: service.category?.name ?? null,
      position: service.position,
      createdAt: service.createdAt.toISOString(),
    };
  }

  async findPaginated(
    businessId: string,
    query: ServiceListQueryDto,
  ): Promise<{ items: ServiceResponse[]; nextCursor: string | null }> {
    if (query.categoryId) {
      await this.serviceCategoryService.ensureCategoryBelongsToBusiness(
        query.categoryId,
        businessId,
        ErrorCode.INVALID_CATEGORY,
      );
    }

    let cursorId: string | null = null;
    if (query.cursor !== undefined && query.cursor !== null && query.cursor !== '') {
      const decoded = decodeCursor(query.cursor);
      if (!decoded) throw AppException.create(ErrorCode.INVALID_CURSOR);
      cursorId = decoded.id;
    }

    const limit = query.limit ?? 20;
    const sort = query.sort ?? 'position';

    const { items, hasMore } = await this.repository.findByBusinessId(businessId, {
      cursorId,
      limit,
      sort,
      search: query.search,
      categoryId: query.categoryId,
    });

    const lastItem = items.length > 0 ? items[items.length - 1] : undefined;
    const nextCursor = hasMore && lastItem ? encodeCursor(lastItem.id) : null;

    return {
      items: items.map((s) => this.toServiceResponse(s)),
      nextCursor,
    };
  }

  async findById(id: string, businessId: string) {
    const service = await this.repository.findByIdAndBusiness(id, businessId);
    if (!service) throw AppException.create(ErrorCode.NOT_FOUND);
    return this.toServiceResponse(service);
  }

  async create(businessId: string, dto: CreateServiceDto) {
    if (dto.categoryId) {
      await this.serviceCategoryService.ensureCategoryBelongsToBusiness(
        dto.categoryId,
        businessId,
        ErrorCode.NOT_FOUND,
      );
    }

    const service = await this.repository.create({
      businessId,
      categoryId: dto.categoryId ?? null,
      name: dto.name,
      description: dto.description ?? null,
      price: dto.price,
      durationMinutes: dto.durationMinutes,
      breakAfterMinutes: dto.breakAfterMinutes ?? 0,
    });
    return this.toServiceResponse(service);
  }

  async update(id: string, businessId: string, dto: UpdateServiceDto) {
    const existing = await this.repository.findByIdAndBusiness(id, businessId);
    if (!existing) throw AppException.create(ErrorCode.NOT_FOUND);

    const hasUpdates = Object.keys(dto).length > 0;
    if (!hasUpdates) {
      return this.toServiceResponse(existing);
    }

    if (dto.categoryId !== undefined && dto.categoryId !== null && dto.categoryId !== '') {
      await this.serviceCategoryService.ensureCategoryBelongsToBusiness(
        dto.categoryId,
        businessId,
        ErrorCode.NOT_FOUND,
      );
    }

    const data: Parameters<typeof this.repository.update>[1] = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.price !== undefined) data.price = dto.price;
    if (dto.durationMinutes !== undefined) data.durationMinutes = dto.durationMinutes;
    if (dto.breakAfterMinutes !== undefined) data.breakAfterMinutes = dto.breakAfterMinutes;
    if (dto.categoryId !== undefined)
      data.categoryId = dto.categoryId === null || dto.categoryId === '' ? null : dto.categoryId;

    const service = await this.repository.update(id, data);
    return this.toServiceResponse(service);
  }

  async delete(id: string, businessId: string): Promise<{ message: string }> {
    const existing = await this.repository.findByIdAndBusiness(id, businessId);
    if (!existing) throw AppException.create(ErrorCode.NOT_FOUND);
    await this.repository.delete(id);
    return { message: 'Услуга удалена' };
  }

  async reorder(id: string, businessId: string, dto: { afterServiceId?: string | null }) {
    const service = await this.repository.findByIdAndBusiness(id, businessId);
    if (!service) throw AppException.create(ErrorCode.NOT_FOUND);

    if (dto.afterServiceId === id) {
      return this.toServiceResponse(service);
    }

    let newPosition: number;

    if (!dto.afterServiceId) {
      const minPos = await this.repository.getMinPosition(businessId);
      newPosition = minPos - 100;
      if (newPosition < 0) {
        await this.repository.rebalancePositions(businessId);
        newPosition = 0;
      }
    } else {
      const afterService = await this.repository.findByIdAndBusiness(
        dto.afterServiceId,
        businessId,
      );
      if (!afterService) throw AppException.create(ErrorCode.NOT_FOUND);

      const next = await this.repository.getNextServiceAfter(businessId, dto.afterServiceId);

      if (!next) {
        const maxPos = await this.repository.getMaxPosition(businessId);
        newPosition = maxPos + 100;
      } else {
        const gap = next.position - afterService.position;
        if (gap > 1) {
          newPosition = afterService.position + Math.floor(gap / 2);
        } else {
          await this.repository.rebalancePositions(businessId);
          const afterRebalanced = await this.repository.findByIdAndBusiness(
            dto.afterServiceId,
            businessId,
          );
          if (!afterRebalanced) throw AppException.create(ErrorCode.NOT_FOUND);
          const nextRebalanced = await this.repository.getNextServiceAfter(
            businessId,
            dto.afterServiceId,
          );
          newPosition = nextRebalanced
            ? afterRebalanced.position +
              Math.floor((nextRebalanced.position - afterRebalanced.position) / 2)
            : afterRebalanced.position + 100;
        }
      }
    }

    const updated = await this.repository.update(id, { position: newPosition });
    return this.toServiceResponse(updated);
  }
}
