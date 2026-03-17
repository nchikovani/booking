import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@repo/prisma';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';
import { PRISMA } from '../prisma/prisma.module';
import type { PrismaClient, Service } from '@repo/prisma';

export interface ServiceWithCategory extends Service {
  category: { id: string; name: string } | null;
  employeeServices?: { employeeId: string }[];
}

export interface ServiceListFilters {
  cursorId?: string | null;
  limit: number;
  sort: 'name' | '-name' | 'position' | '-position';
  search?: string;
  categoryId?: string;
}

export interface CreateServiceData {
  businessId: string;
  categoryId?: string | null;
  name: string;
  description?: string | null;
  price: number;
  durationMinutes: number;
  breakAfterMinutes?: number | null;
}

export interface UpdateServiceData {
  name?: string;
  description?: string | null;
  price?: number;
  durationMinutes?: number;
  breakAfterMinutes?: number | null;
  categoryId?: string | null;
  position?: number;
}

@Injectable()
export class ServiceRepository {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  private getOrderBy(sort: ServiceListFilters['sort']): Prisma.ServiceOrderByWithRelationInput[] {
    switch (sort) {
      case 'name':
        return [{ name: 'asc' }, { id: 'asc' }];
      case '-name':
        return [{ name: 'desc' }, { id: 'asc' }];
      case 'position':
        return [{ position: 'asc' }, { id: 'asc' }];
      case '-position':
        return [{ position: 'desc' }, { id: 'asc' }];
      default:
        return [{ position: 'asc' }, { id: 'asc' }];
    }
  }

  async findByBusinessId(
    businessId: string,
    filters: ServiceListFilters,
  ): Promise<{ items: ServiceWithCategory[]; hasMore: boolean }> {
    const { cursorId, limit, sort, search, categoryId } = filters;

    const where: Prisma.ServiceWhereInput = {
      businessId,
      ...(categoryId && { categoryId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const take = limit + 1;
    const orderBy = this.getOrderBy(sort);

    const items = await this.prisma.service.findMany({
      where,
      orderBy,
      take,
      skip: cursorId ? 1 : 0,
      cursor: cursorId ? { id: cursorId } : undefined,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        durationMinutes: true,
        breakAfterMinutes: true,
        categoryId: true,
        position: true,
        createdAt: true,
        category: {
          select: { id: true, name: true },
        },
        employeeServices: {
          select: { employeeId: true },
        },
      },
    });

    const hasMore = items.length > limit;
    const result = hasMore ? items.slice(0, limit) : items;

    return {
      items: result as ServiceWithCategory[],
      hasMore,
    };
  }

  async findById(id: string): Promise<ServiceWithCategory | null> {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true } },
        employeeServices: { select: { employeeId: true } },
      },
    });
    return service as ServiceWithCategory | null;
  }

  async create(data: CreateServiceData): Promise<ServiceWithCategory> {
    const maxPos = await this.getMaxPosition(data.businessId);
    const position = maxPos + 100;

    const service = await this.prisma.service.create({
      data: {
        ...data,
        position,
        breakAfterMinutes: data.breakAfterMinutes ?? 0,
      },
      include: {
        category: { select: { id: true, name: true } },
        employeeServices: { select: { employeeId: true } },
      },
    });
    return service as ServiceWithCategory;
  }

  /**
   * Создаёт услугу и связи с сотрудниками в одной транзакции.
   * При невалидных employeeIds — throw AppException NOT_FOUND.
   */
  async createWithEmployeeLinks(
    data: CreateServiceData,
    employeeIds: string[],
  ): Promise<ServiceWithCategory> {
    return this.prisma.$transaction(async (tx) => {
      if (employeeIds.length > 0) {
        const employees = await tx.employee.findMany({
          where: { id: { in: employeeIds }, businessId: data.businessId },
          select: { id: true },
        });
        if (employees.length !== employeeIds.length) {
          throw AppException.create(ErrorCode.NOT_FOUND);
        }
      }

      const maxPosResult = await tx.service.aggregate({
        where: { businessId: data.businessId },
        _max: { position: true },
      });
      const position = (maxPosResult._max.position ?? 0) + 100;

      const service = await tx.service.create({
        data: {
          ...data,
          position,
          breakAfterMinutes: data.breakAfterMinutes ?? 0,
        },
        include: {
          category: { select: { id: true, name: true } },
          employeeServices: { select: { employeeId: true } },
        },
      });

      if (employeeIds.length > 0) {
        await tx.employeeService.createMany({
          data: employeeIds.map((employeeId) => ({
            employeeId,
            serviceId: service.id,
          })),
          skipDuplicates: true,
        });
        const updated = await tx.service.findUnique({
          where: { id: service.id },
          include: {
            category: { select: { id: true, name: true } },
            employeeServices: { select: { employeeId: true } },
          },
        });
        return updated as ServiceWithCategory;
      }

      return service as ServiceWithCategory;
    });
  }

  async update(id: string, data: UpdateServiceData): Promise<ServiceWithCategory> {
    const service = await this.prisma.service.update({
      where: { id },
      data,
      include: {
        category: { select: { id: true, name: true } },
        employeeServices: { select: { employeeId: true } },
      },
    });
    return service as ServiceWithCategory;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.service.delete({
      where: { id },
    });
  }

  async getMaxPosition(businessId: string): Promise<number> {
    const result = await this.prisma.service.aggregate({
      where: { businessId },
      _max: { position: true },
    });
    return result._max.position ?? 0;
  }

  async getMinPosition(businessId: string): Promise<number> {
    const result = await this.prisma.service.aggregate({
      where: { businessId },
      _min: { position: true },
    });
    return result._min.position ?? 0;
  }

  /**
   * Услуга, следующая после afterId в порядке position (asc).
   */
  async getNextServiceAfter(
    businessId: string,
    afterId: string,
  ): Promise<{ id: string; position: number } | null> {
    const after = await this.prisma.service.findUnique({
      where: { id: afterId, businessId },
      select: { position: true },
    });
    if (!after) return null;

    const next = await this.prisma.service.findFirst({
      where: {
        businessId,
        position: { gt: after.position },
      },
      orderBy: { position: 'asc' },
      select: { id: true, position: true },
    });
    return next;
  }

  async findByIdAndBusiness(id: string, businessId: string): Promise<ServiceWithCategory | null> {
    const service = await this.prisma.service.findFirst({
      where: { id, businessId },
      include: {
        category: { select: { id: true, name: true } },
        employeeServices: { select: { employeeId: true } },
      },
    });
    return service as ServiceWithCategory | null;
  }

  async rebalancePositions(businessId: string): Promise<void> {
    const services = await this.prisma.service.findMany({
      where: { businessId },
      orderBy: { position: 'asc' },
      select: { id: true },
    });
    await this.prisma.$transaction(
      services.map((s, i) =>
        this.prisma.service.update({
          where: { id: s.id },
          data: { position: (i + 1) * 100 },
        }),
      ),
    );
  }
}
