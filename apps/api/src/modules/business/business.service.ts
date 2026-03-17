import { Injectable } from '@nestjs/common';
import { BusinessRole, type Business } from '@repo/prisma';
import { AppException } from '../../common/errors/app.exception';
import { ErrorCode } from '../../common/errors/error-codes';
import type { UpdateBusinessDto } from './dto/update-business.dto';
import { BusinessRepository } from './business.repository';
import { StorageService } from '../storage/storage.service';

export interface BusinessMember {
  business: Business;
  role: BusinessRole;
}

@Injectable()
export class BusinessService {
  constructor(
    private readonly repository: BusinessRepository,
    private readonly storageService: StorageService,
  ) {}

  private toPublicUrl(path: string | null): string | null {
    return path ? this.storageService.getPublicUrl(path) : null;
  }

  /**
   * Ensures the admin user has a business. Creates one if none exists (MVP: max 1).
   */
  async ensureBusinessForUser(adminUserId: string) {
    const list = await this.repository.findByAdminUser(adminUserId);
    if (list.length > 0) {
      return list[0];
    }
    const business = await this.repository.create({ adminUserId });
    return { ...business, role: 'OWNER' as const };
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  /**
   * Public data for Mini App (Feature 1.9) — no createdAt/updatedAt.
   */
  async findByIdPublic(id: string) {
    const business = await this.repository.findById(id);
    if (!business) return null;
    return {
      id: business.id,
      name: business.name,
      description: business.description,
      logoUrl: this.toPublicUrl(business.logoPath),
      imageUrl: this.toPublicUrl(business.imagePath),
      phone: business.phone,
      email: business.email,
      website: business.website,
      telegram: business.telegram,
      vk: business.vk,
      youtube: business.youtube,
      address: business.address,
      latitude: business.latitude,
      longitude: business.longitude,
    };
  }

  async findByAdminUser(adminUserId: string) {
    const list = await this.repository.findByAdminUser(adminUserId);
    return list.map((b) => ({
      id: b.id,
      name: b.name,
      description: b.description,
      logoUrl: this.toPublicUrl(b.logoPath),
      role: b.role,
    }));
  }

  /**
   * Проверяет членство. Возвращает member или throws 404 (не раскрывать существование ресурса).
   * Использовать в контроллерах Admin API перед операциями с бизнесом или связанными сущностями.
   */
  async requireBusinessMember(adminUserId: string, businessId: string): Promise<BusinessMember> {
    const member = await this.repository.checkMember(adminUserId, businessId);
    if (!member) throw AppException.create(ErrorCode.NOT_FOUND);
    return member;
  }

  /**
   * Проверяет, что пользователь — OWNER. Throws 404 при отсутствии доступа или неверной роли.
   */
  async requireBusinessOwner(adminUserId: string, businessId: string): Promise<BusinessMember> {
    const member = await this.requireBusinessMember(adminUserId, businessId);
    if (member.role !== BusinessRole.OWNER) throw AppException.create(ErrorCode.NOT_FOUND);
    return member;
  }

  async update(id: string, dto: UpdateBusinessDto) {
    const data: Record<string, unknown> = {};
    const fields = [
      'name',
      'description',
      'phone',
      'email',
      'website',
      'telegram',
      'vk',
      'youtube',
      'address',
      'latitude',
      'longitude',
    ] as const;
    for (const field of fields) {
      if (field in dto) {
        const val = (dto as Record<string, unknown>)[field];
        data[field] = val === '' ? null : (val ?? null);
      }
    }
    return this.repository.update(id, data as Parameters<typeof this.repository.update>[1]);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async uploadLogo(businessId: string, buffer: Buffer): Promise<{ url: string }> {
    const business = await this.repository.findById(businessId);
    if (!business) throw AppException.create(ErrorCode.NOT_FOUND);
    if (business.logoPath) {
      await this.storageService.delete(business.logoPath);
    }
    const key = `businesses/${businessId}/logo.webp`;
    await this.storageService.upload(buffer, key);
    await this.repository.update(businessId, { logoPath: key });
    return { url: this.storageService.getPublicUrl(key) };
  }

  async uploadImage(businessId: string, buffer: Buffer): Promise<{ url: string }> {
    const business = await this.repository.findById(businessId);
    if (!business) throw AppException.create(ErrorCode.NOT_FOUND);
    if (business.imagePath) {
      await this.storageService.delete(business.imagePath);
    }
    const key = `businesses/${businessId}/image.webp`;
    await this.storageService.upload(buffer, key);
    await this.repository.update(businessId, { imagePath: key });
    return { url: this.storageService.getPublicUrl(key) };
  }

  async deleteLogo(businessId: string): Promise<void> {
    const business = await this.repository.findById(businessId);
    if (!business) throw AppException.create(ErrorCode.NOT_FOUND);
    if (business.logoPath) {
      await this.storageService.delete(business.logoPath);
    }
    await this.repository.update(businessId, { logoPath: null });
  }

  async deleteImage(businessId: string): Promise<void> {
    const business = await this.repository.findById(businessId);
    if (!business) throw AppException.create(ErrorCode.NOT_FOUND);
    if (business.imagePath) {
      await this.storageService.delete(business.imagePath);
    }
    await this.repository.update(businessId, { imagePath: null });
  }

  /**
   * Builds full business response with logoUrl/imageUrl for admin API.
   */
  toBusinessResponse(business: Business) {
    return {
      ...business,
      logoUrl: this.toPublicUrl(business.logoPath),
      imageUrl: this.toPublicUrl(business.imagePath),
      createdAt: business.createdAt.toISOString(),
      updatedAt: business.updatedAt.toISOString(),
    };
  }
}
