import { Injectable } from '@nestjs/common';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';
import type { CreateEmployeeDto } from './dto/create-employee.dto';
import type { UpdateEmployeeDto } from './dto/update-employee.dto';
import type { EmployeeListQueryDto } from './dto/employee-list-query.dto';
import { EmployeeRepository } from './employee.repository';
import type { EmployeeWithServices } from './employee.repository';
import { StorageService } from '../storage/storage.service';

export interface ServiceLinkResponse {
  serviceId: string;
  priceOverride?: string | null;
  durationMinutesOverride?: number | null;
}

export interface EmployeeResponse {
  id: string;
  name: string;
  specialization: string | null;
  imageUrl: string | null;
  services: ServiceLinkResponse[];
  createdAt: string;
  updatedAt?: string;
}

@Injectable()
export class EmployeeService {
  constructor(
    private readonly repository: EmployeeRepository,
    private readonly storageService: StorageService,
  ) {}

  private toEmployeeResponse(
    employee: EmployeeWithServices,
    options?: { includeUpdatedAt?: boolean },
  ): EmployeeResponse {
    const services = (employee.employeeServices ?? []).map((es) => ({
      serviceId: es.serviceId,
      priceOverride: es.priceOverride != null ? String(es.priceOverride) : null,
      durationMinutesOverride: es.durationMinutesOverride ?? null,
    }));
    const base = {
      id: employee.id,
      name: employee.name,
      specialization: employee.specialization ?? null,
      imageUrl: employee.imagePath ? this.storageService.getPublicUrl(employee.imagePath) : null,
      services,
      createdAt: employee.createdAt.toISOString(),
    };
    if (options?.includeUpdatedAt) {
      return { ...base, updatedAt: employee.updatedAt.toISOString() };
    }
    return base;
  }

  async findByBusinessId(
    businessId: string,
    query: EmployeeListQueryDto,
  ): Promise<EmployeeResponse[]> {
    const sort = query.sort ?? 'name';
    const items = await this.repository.findByBusinessId(businessId, {
      search: query.search,
      sort,
    });
    return items.map((e) => this.toEmployeeResponse(e));
  }

  async findById(id: string, businessId: string): Promise<EmployeeResponse> {
    const employee = await this.repository.findByIdAndBusiness(id, businessId);
    if (!employee) throw AppException.create(ErrorCode.NOT_FOUND);
    return this.toEmployeeResponse(employee, { includeUpdatedAt: true });
  }

  async create(businessId: string, dto: CreateEmployeeDto): Promise<EmployeeResponse> {
    const services = dto.services ?? [];
    const deduped = services.filter(
      (s, i, arr) => arr.findIndex((x) => x.serviceId === s.serviceId) === i,
    );
    const serviceIds = deduped.map((s) => s.serviceId);

    if (serviceIds.length > 0) {
      const valid = await this.repository.validateServiceIdsBelongToBusiness(
        serviceIds,
        businessId,
      );
      if (!valid) throw AppException.create(ErrorCode.NOT_FOUND);
    }

    const items = deduped.map((s) => ({
      serviceId: s.serviceId,
      priceOverride: s.priceOverride,
      durationMinutesOverride: s.durationMinutesOverride,
    }));

    const employee = await this.repository.createWithServiceLinks(
      {
        businessId,
        name: dto.name,
        specialization: dto.specialization ?? null,
      },
      items,
    );
    return this.toEmployeeResponse(employee, { includeUpdatedAt: true });
  }

  async update(id: string, businessId: string, dto: UpdateEmployeeDto): Promise<EmployeeResponse> {
    const existing = await this.repository.findByIdAndBusiness(id, businessId);
    if (!existing) throw AppException.create(ErrorCode.NOT_FOUND);

    const hasServices = 'services' in dto && dto.services !== undefined;

    if (hasServices) {
      const services = dto.services ?? [];
      const deduped = services.filter(
        (s, i, arr) => arr.findIndex((x) => x.serviceId === s.serviceId) === i,
      );
      const serviceIds = deduped.map((s) => s.serviceId);
      if (serviceIds.length > 0) {
        const valid = await this.repository.validateServiceIdsBelongToBusiness(
          serviceIds,
          businessId,
        );
        if (!valid) throw AppException.create(ErrorCode.NOT_FOUND);
      }
      const items = deduped.map((s) => ({
        serviceId: s.serviceId,
        priceOverride: s.priceOverride,
        durationMinutesOverride: s.durationMinutesOverride,
      }));
      await this.repository.syncEmployeeServiceLinks(id, items);
    }

    const data: Parameters<typeof this.repository.update>[1] = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.specialization !== undefined)
      data.specialization = dto.specialization === null ? null : dto.specialization;

    const hasDataUpdates = Object.keys(data).length > 0;
    const employee = hasDataUpdates
      ? await this.repository.update(id, data)
      : hasServices
        ? await this.repository.findByIdAndBusiness(id, businessId)
        : existing;

    return this.toEmployeeResponse(employee!, { includeUpdatedAt: true });
  }

  async delete(id: string, businessId: string) {
    const existing = await this.repository.findByIdAndBusiness(id, businessId);
    if (!existing) throw AppException.create(ErrorCode.NOT_FOUND);

    if (existing.imagePath) {
      await this.storageService.delete(existing.imagePath);
    }

    await this.repository.delete(id);
    return null;
  }

  async uploadPhoto(
    employeeId: string,
    businessId: string,
    buffer: Buffer,
  ): Promise<{ url: string }> {
    const employee = await this.repository.findByIdAndBusiness(employeeId, businessId);
    if (!employee) throw AppException.create(ErrorCode.NOT_FOUND);

    if (employee.imagePath) {
      await this.storageService.delete(employee.imagePath);
    }

    const key = `employees/${employeeId}/photo.webp`;
    await this.storageService.upload(buffer, key);
    await this.repository.update(employeeId, { imagePath: key });

    return { url: this.storageService.getPublicUrl(key) };
  }

  async deletePhoto(employeeId: string, businessId: string): Promise<void> {
    const employee = await this.repository.findByIdAndBusiness(employeeId, businessId);
    if (!employee) throw AppException.create(ErrorCode.NOT_FOUND);

    if (employee.imagePath) {
      await this.storageService.delete(employee.imagePath);
    }

    await this.repository.update(employeeId, { imagePath: null });
  }

  /**
   * Проверяет, что все employeeIds принадлежат бизнесу. Throws 404 при невалидном.
   */
  async validateEmployeeIdsBelongToBusiness(
    employeeIds: string[],
    businessId: string,
  ): Promise<void> {
    if (employeeIds.length === 0) return;
    const uniqueIds = [...new Set(employeeIds)];
    const employees = await this.repository.findByIdsAndBusiness(uniqueIds, businessId);
    if (employees.length !== uniqueIds.length) {
      throw AppException.create(ErrorCode.NOT_FOUND);
    }
  }

  /**
   * Синхронизирует связи услуги с сотрудниками. Вызывается из ServiceService.
   */
  async syncServiceEmployeeLinks(
    serviceId: string,
    items: { employeeId: string; priceOverride?: number; durationMinutesOverride?: number }[],
    businessId: string,
  ): Promise<void> {
    const uniqueIds = [...new Set(items.map((i) => i.employeeId))];

    if (uniqueIds.length > 0) {
      const employees = await this.repository.findByIdsAndBusiness(uniqueIds, businessId);
      if (employees.length !== uniqueIds.length) {
        throw AppException.create(ErrorCode.NOT_FOUND);
      }
    }

    await this.repository.syncServiceEmployeeLinks(serviceId, items);
  }
}
