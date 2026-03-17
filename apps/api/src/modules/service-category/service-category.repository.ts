import { Inject, Injectable } from '@nestjs/common';
import { PRISMA } from '../prisma/prisma.module';
import type { PrismaClient } from '@repo/prisma';

export interface ServiceCategoryListItem {
  id: string;
  name: string;
  createdAt: Date;
}

@Injectable()
export class ServiceCategoryRepository {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  async findByBusinessId(businessId: string): Promise<ServiceCategoryListItem[]> {
    return this.prisma.serviceCategory.findMany({
      where: { businessId },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.serviceCategory.findUnique({
      where: { id },
    });
  }

  async create(businessId: string, name: string): Promise<ServiceCategoryListItem> {
    return this.prisma.serviceCategory.create({
      data: { businessId, name },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async update(id: string, data: { name?: string }): Promise<ServiceCategoryListItem> {
    return this.prisma.serviceCategory.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.serviceCategory.delete({
      where: { id },
    });
  }
}
