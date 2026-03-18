import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@repo/prisma';
import { PRISMA } from '../prisma/prisma.module';
import type { Employee, PrismaClient } from '@repo/prisma';

export interface EmployeeServiceLink {
  serviceId: string;
  priceOverride?: unknown;
  durationMinutesOverride?: number | null;
}

export interface EmployeeWithServices extends Employee {
  employeeServices: EmployeeServiceLink[];
}

export interface EmployeeListFilters {
  search?: string;
  sort: 'name' | '-name';
}

export interface CreateEmployeeData {
  businessId: string;
  name: string;
  specialization?: string | null;
}

export interface UpdateEmployeeData {
  name?: string;
  specialization?: string | null;
  imagePath?: string | null;
}

@Injectable()
export class EmployeeRepository {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  private getOrderBy(sort: EmployeeListFilters['sort']): Prisma.EmployeeOrderByWithRelationInput[] {
    switch (sort) {
      case 'name':
        return [{ name: 'asc' }, { id: 'asc' }];
      case '-name':
        return [{ name: 'desc' }, { id: 'asc' }];
      default:
        return [{ name: 'asc' }, { id: 'asc' }];
    }
  }

  async findByBusinessId(
    businessId: string,
    filters: EmployeeListFilters,
  ): Promise<EmployeeWithServices[]> {
    const { search, sort } = filters;

    const where: Prisma.EmployeeWhereInput = {
      businessId,
      ...(search &&
        search.trim() !== '' && {
          name: { contains: search, mode: 'insensitive' },
        }),
    };

    const items = await this.prisma.employee.findMany({
      where,
      orderBy: this.getOrderBy(sort),
      select: {
        id: true,
        businessId: true,
        name: true,
        specialization: true,
        imagePath: true,
        createdAt: true,
        updatedAt: true,
        employeeServices: {
          select: { serviceId: true, priceOverride: true, durationMinutesOverride: true },
        },
      },
    });

    return items as EmployeeWithServices[];
  }

  async findById(id: string): Promise<EmployeeWithServices | null> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        employeeServices: {
          select: { serviceId: true, priceOverride: true, durationMinutesOverride: true },
        },
      },
    });
    return employee as EmployeeWithServices | null;
  }

  async findByIdAndBusiness(id: string, businessId: string): Promise<EmployeeWithServices | null> {
    const employee = await this.prisma.employee.findFirst({
      where: { id, businessId },
      include: {
        employeeServices: {
          select: { serviceId: true, priceOverride: true, durationMinutesOverride: true },
        },
      },
    });
    return employee as EmployeeWithServices | null;
  }

  async findByIdsAndBusiness(ids: string[], businessId: string): Promise<EmployeeWithServices[]> {
    if (ids.length === 0) return [];

    const employees = await this.prisma.employee.findMany({
      where: { id: { in: ids }, businessId },
      include: {
        employeeServices: {
          select: { serviceId: true, priceOverride: true, durationMinutesOverride: true },
        },
      },
    });
    return employees as EmployeeWithServices[];
  }

  async create(data: CreateEmployeeData): Promise<EmployeeWithServices> {
    const employee = await this.prisma.employee.create({
      data,
      include: {
        employeeServices: {
          select: { serviceId: true, priceOverride: true, durationMinutesOverride: true },
        },
      },
    });
    return employee as EmployeeWithServices;
  }

  /**
   * Создаёт сотрудника и связи с услугами в одной транзакции.
   */
  async createWithServiceLinks(
    data: CreateEmployeeData,
    items: { serviceId: string; priceOverride?: number; durationMinutesOverride?: number }[],
  ): Promise<EmployeeWithServices> {
    return this.prisma.$transaction(async (tx) => {
      const employee = await tx.employee.create({
        data,
        include: {
          employeeServices: {
            select: { serviceId: true, priceOverride: true, durationMinutesOverride: true },
          },
        },
      });
      if (items.length > 0) {
        for (const item of items) {
          await tx.employeeService.create({
            data: {
              employeeId: employee.id,
              serviceId: item.serviceId,
              priceOverride: item.priceOverride,
              durationMinutesOverride: item.durationMinutesOverride,
            },
          });
        }
        const withLinks = await tx.employee.findUnique({
          where: { id: employee.id },
          include: {
            employeeServices: {
              select: { serviceId: true, priceOverride: true, durationMinutesOverride: true },
            },
          },
        });
        return withLinks as EmployeeWithServices;
      }
      return employee as EmployeeWithServices;
    });
  }

  async update(id: string, data: UpdateEmployeeData): Promise<EmployeeWithServices> {
    const employee = await this.prisma.employee.update({
      where: { id },
      data,
      include: {
        employeeServices: {
          select: { serviceId: true, priceOverride: true, durationMinutesOverride: true },
        },
      },
    });
    return employee as EmployeeWithServices;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.employee.delete({
      where: { id },
    });
  }

  /**
   * Синхронизирует связи сотрудник ↔ услуги. Удаляет старые, создаёт новые.
   * При пустом items — только удаление.
   */
  async syncEmployeeServiceLinks(
    employeeId: string,
    items: { serviceId: string; priceOverride?: number; durationMinutesOverride?: number }[],
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.employeeService.deleteMany({
        where: { employeeId },
      });
      for (const item of items) {
        await tx.employeeService.create({
          data: {
            employeeId,
            serviceId: item.serviceId,
            priceOverride: item.priceOverride,
            durationMinutesOverride: item.durationMinutesOverride,
          },
        });
      }
    });
  }

  /**
   * Синхронизирует связи услуга ↔ сотрудники. Удаляет старые, создаёт новые.
   * При пустом items — только удаление.
   */
  async syncServiceEmployeeLinks(
    serviceId: string,
    items: { employeeId: string; priceOverride?: number; durationMinutesOverride?: number }[],
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.employeeService.deleteMany({
        where: { serviceId },
      });
      for (const item of items) {
        await tx.employeeService.create({
          data: {
            serviceId,
            employeeId: item.employeeId,
            priceOverride: item.priceOverride,
            durationMinutesOverride: item.durationMinutesOverride,
          },
        });
      }
    });
  }

  /**
   * Проверяет, что все serviceIds принадлежат бизнесу.
   * @returns true если все ids валидны
   */
  async validateServiceIdsBelongToBusiness(ids: string[], businessId: string): Promise<boolean> {
    if (ids.length === 0) return true;

    const uniqueIds = [...new Set(ids)];
    const found = await this.prisma.service.findMany({
      where: { id: { in: uniqueIds }, businessId },
      select: { id: true },
    });
    return found.length === uniqueIds.length;
  }
}
