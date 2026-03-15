import { Inject, Injectable } from '@nestjs/common';
import { BusinessRole, Prisma } from '@repo/prisma';
import { PRISMA } from '../prisma/prisma.module';
import type { Business, PrismaClient } from '@repo/prisma';

export interface BusinessWithMember extends Business {
  businessMembers: Array<{ role: BusinessRole }>;
}

export interface CreateBusinessData {
  adminUserId: string;
}

export interface UpdateBusinessData {
  name?: string | null;
  description?: string | null;
  logoPath?: string | null;
  imagePath?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  telegram?: string | null;
  vk?: string | null;
  youtube?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

@Injectable()
export class BusinessRepository {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  async create(data: CreateBusinessData, tx?: Prisma.TransactionClient): Promise<Business> {
    const client = tx ?? this.prisma;
    const business = await client.business.create({
      data: {},
    });
    await client.businessMember.create({
      data: {
        adminUserId: data.adminUserId,
        businessId: business.id,
        role: BusinessRole.OWNER,
      },
    });
    return business;
  }

  async findById(id: string): Promise<Business | null> {
    return this.prisma.business.findUnique({
      where: { id },
    });
  }

  async findByIdWithMembers(id: string): Promise<BusinessWithMember | null> {
    return this.prisma.business.findUnique({
      where: { id },
      include: {
        businessMembers: { select: { role: true } },
      },
    }) as Promise<BusinessWithMember | null>;
  }

  async findByAdminUser(adminUserId: string): Promise<Array<Business & { role: BusinessRole }>> {
    const members = await this.prisma.businessMember.findMany({
      where: { adminUserId },
      include: { business: true },
    });
    return members.map((m) => ({ ...m.business, role: m.role }));
  }

  async update(id: string, data: UpdateBusinessData): Promise<Business> {
    return this.prisma.business.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.business.delete({
      where: { id },
    });
  }

  async checkMember(
    adminUserId: string,
    businessId: string,
  ): Promise<{ business: Business; role: BusinessRole } | null> {
    const member = await this.prisma.businessMember.findUnique({
      where: {
        adminUserId_businessId: { adminUserId, businessId },
      },
      include: { business: true },
    });
    if (!member) return null;
    return { business: member.business, role: member.role };
  }
}
