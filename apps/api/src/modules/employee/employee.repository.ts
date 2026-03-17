import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@repo/prisma';
import { PRISMA } from '../prisma/prisma.module';
import type { Employee, PrismaClient } from '@repo/prisma';

export interface EmployeeWithServices extends Employee {
  employeeServices: { serviceId: string }[];
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
          select: { serviceId: true },
        },
      },
    });

    return items as EmployeeWithServices[];
  }

  async findById(id: string): Promise<EmployeeWithServices | null> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        employeeServices: { select: { serviceId: true } },
      },
    });
    return employee as EmployeeWithServices | null;
  }

  async findByIdAndBusiness(id: string, businessId: string): Promise<EmployeeWithServices | null> {
    const employee = await this.prisma.employee.findFirst({
      where: { id, businessId },
      include: {
        employeeServices: { select: { serviceId: true } },
      },
    });
    return employee as EmployeeWithServices | null;
  }

  async findByIdsAndBusiness(ids: string[], businessId: string): Promise<EmployeeWithServices[]> {
    if (ids.length === 0) return [];

    const employees = await this.prisma.employee.findMany({
      where: { id: { in: ids }, businessId },
      include: {
        employeeServices: { select: { serviceId: true } },
      },
    });
    return employees as EmployeeWithServices[];
  }

  async create(data: CreateEmployeeData): Promise<EmployeeWithServices> {
    const employee = await this.prisma.employee.create({
      data,
      include: {
        employeeServices: { select: { serviceId: true } },
      },
    });
    return employee as EmployeeWithServices;
  }

  /**
   * Создаёт сотрудника и связи с услугами в одной транзакции.
   */
  async createWithServiceLinks(
    data: CreateEmployeeData,
    serviceIds: string[],
  ): Promise<EmployeeWithServices> {
    return this.prisma.$transaction(async (tx) => {
      const employee = await tx.employee.create({
        data,
        include: {
          employeeServices: { select: { serviceId: true } },
        },
      });
      if (serviceIds.length > 0) {
        await tx.employeeService.createMany({
          data: serviceIds.map((serviceId) => ({
            employeeId: employee.id,
            serviceId,
          })),
          skipDuplicates: true,
        });
        const withLinks = await tx.employee.findUnique({
          where: { id: employee.id },
          include: {
            employeeServices: { select: { serviceId: true } },
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
        employeeServices: { select: { serviceId: true } },
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
   * При пустом serviceIds — только удаление.
   */
  async syncEmployeeServiceLinks(employeeId: string, serviceIds: string[]): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.employeeService.deleteMany({
        where: { employeeId },
      });
      if (serviceIds.length > 0) {
        await tx.employeeService.createMany({
          data: serviceIds.map((serviceId) => ({ employeeId, serviceId })),
          skipDuplicates: true,
        });
      }
    });
  }

  /**
   * Синхронизирует связи услуга ↔ сотрудники. Удаляет старые, создаёт новые.
   * При пустом employeeIds — только удаление.
   */
  async syncServiceEmployeeLinks(serviceId: string, employeeIds: string[]): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.employeeService.deleteMany({
        where: { serviceId },
      });
      if (employeeIds.length > 0) {
        await tx.employeeService.createMany({
          data: employeeIds.map((employeeId) => ({ employeeId, serviceId })),
          skipDuplicates: true,
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
