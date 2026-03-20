import type { Business, UpdateBusinessDto } from '@entities/business';
import { toApiPhone } from '@shared/lib';
import type { BusinessFormValues } from './types';

function readApiText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export function mapBusinessToFormValues(business: Business): BusinessFormValues {
  return {
    name: readApiText(business.name),
    description: readApiText(business.description),
    address: readApiText(business.address),
    phone: readApiText(business.phone),
    email: readApiText(business.email),
    website: readApiText(business.website),
    telegram: readApiText(business.telegram),
    vk: readApiText(business.vk),
    youtube: readApiText(business.youtube),
  };
}

/**
 * Backend преобразует пустые строки в null через Transform.
 * На клиенте оставляем DTO-тип контракта без дополнительных кастов.
 */
export function mapFormValuesToUpdateBusinessDto(values: BusinessFormValues): UpdateBusinessDto {
  const toDtoValue = (value: string) => {
    const trimmed = value.trim();
    return trimmed === '' ? '' : trimmed;
  };

  return {
    name: toDtoValue(values.name),
    description: toDtoValue(values.description),
    address: toDtoValue(values.address),
    phone: toApiPhone(values.phone),
    email: toDtoValue(values.email),
    website: toDtoValue(values.website),
    telegram: toDtoValue(values.telegram),
    vk: toDtoValue(values.vk),
    youtube: toDtoValue(values.youtube),
  };
}
