import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@repo/prisma';
import { PRISMA } from '../prisma/prisma.module';
import type { Employee, PrismaClient } from '@repo/prisma';

type TransactionClient = Prisma.TransactionClient;

export interface EmployeeServiceLink {
  serviceId: string;
  priceOverride?: unknown;
  durationMinutesOverride?: number | null;
}

const employeeScheduleInclude = {
  days: {
    include: { breaks: true },
    orderBy: { dayOfWeek: 'asc' as const },
  },
  scheduleTemplate: {
    include: {
      days: {
        include: { breaks: true },
        orderBy: { dayOfWeek: 'asc' as const },
      },
    },
  },
} as const;

export interface EmployeeWithServices extends Employee {
  employeeServices: EmployeeServiceLink[];
  employeeSchedule?: {
    id: string;
    employeeId: string;
    scheduleTemplateId: string | null;
    createdAt: Date;
    updatedAt: Date;
    days: Array<{
      id: string;
      dayOfWeek: number;
      startTimeMinutes: number;
      endTimeMinutes: number;
      breaks: Array<{
        id: string;
        startTimeMinutes: number;
        endTimeMinutes: number;
      }>;
    }>;
    scheduleTemplate: {
      id: string;
      name: string;
      days: Array<{
        id: string;
        dayOfWeek: number;
        startTimeMinutes: number;
        endTimeMinutes: number;
        breaks: Array<{
          id: string;
          startTimeMinutes: number;
          endTimeMinutes: number;
        }>;
      }>;
    } | null;
  } | null;
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
        employeeSchedule: { include: employeeScheduleInclude },
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
        employeeSchedule: { include: employeeScheduleInclude },
      },
    });
    return employee as EmployeeWithServices | null;
  }

  async findByIdAndBusiness(
    id: string,
    businessId: string,
    tx?: TransactionClient,
  ): Promise<EmployeeWithServices | null> {
    const client = tx ?? this.prisma;
    const employee = await client.employee.findFirst({
      where: { id, businessId },
      include: {
        employeeServices: {
          select: { serviceId: true, priceOverride: true, durationMinutesOverride: true },
        },
        employeeSchedule: { include: employeeScheduleInclude },
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
   * Создаёт сотрудника и связи с услугами. При tx — в рамках транзакции.
   */
  async createWithServiceLinks(
    data: CreateEmployeeData,
    items: { serviceId: string; priceOverride?: number; durationMinutesOverride?: number }[],
    tx?: TransactionClient,
  ): Promise<EmployeeWithServices> {
    const run = async (client: TransactionClient) => {
      const employee = await client.employee.create({
        data,
        include: {
          employeeServices: {
            select: { serviceId: true, priceOverride: true, durationMinutesOverride: true },
          },
          employeeSchedule: { include: employeeScheduleInclude },
        },
      });
      if (items.length > 0) {
        for (const item of items) {
          await client.employeeService.create({
            data: {
              employeeId: employee.id,
              serviceId: item.serviceId,
              priceOverride: item.priceOverride,
              durationMinutesOverride: item.durationMinutesOverride,
            },
          });
        }
        const withLinks = await client.employee.findUnique({
          where: { id: employee.id },
          include: {
            employeeServices: {
              select: { serviceId: true, priceOverride: true, durationMinutesOverride: true },
            },
            employeeSchedule: { include: employeeScheduleInclude },
          },
        });
        return withLinks as EmployeeWithServices;
      }
      return employee as EmployeeWithServices;
    };
    if (tx) return run(tx);
    return this.prisma.$transaction(run);
  }

  async update(
    id: string,
    data: UpdateEmployeeData,
    tx?: TransactionClient,
  ): Promise<EmployeeWithServices> {
    const client = tx ?? this.prisma;
    const employee = await client.employee.update({
      where: { id },
      data,
      include: {
        employeeServices: {
          select: { serviceId: true, priceOverride: true, durationMinutesOverride: true },
        },
        employeeSchedule: { include: employeeScheduleInclude },
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
   * При пустом items — только удаление. При tx — в рамках транзакции.
   */
  async syncEmployeeServiceLinks(
    employeeId: string,
    items: { serviceId: string; priceOverride?: number; durationMinutesOverride?: number }[],
    tx?: TransactionClient,
  ): Promise<void> {
    const run = async (client: TransactionClient) => {
      await client.employeeService.deleteMany({
        where: { employeeId },
      });
      for (const item of items) {
        await client.employeeService.create({
          data: {
            employeeId,
            serviceId: item.serviceId,
            priceOverride: item.priceOverride,
            durationMinutesOverride: item.durationMinutesOverride,
          },
        });
      }
    };
    if (tx) return run(tx);
    return this.prisma.$transaction(run);
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
   * Выполняет callback в транзакции. Используется сервисом для оркестрации нескольких операций.
   */
  async runInTransaction<T>(fn: (tx: TransactionClient) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(fn);
  }

  /**
   * Проверяет, что все serviceIds принадлежат бизнесу.
   * @returns true если все ids валидны
   */
  async validateServiceIdsBelongToBusiness(
    ids: string[],
    businessId: string,
    tx?: TransactionClient,
  ): Promise<boolean> {
    if (ids.length === 0) return true;

    const client = tx ?? this.prisma;
    const uniqueIds = [...new Set(ids)];
    const found = await client.service.findMany({
      where: { id: { in: uniqueIds }, businessId },
      select: { id: true },
    });
    return found.length === uniqueIds.length;
  }
}
