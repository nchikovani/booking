import { client } from '@api';
import { getResponseDataOrThrow } from '@shared/api/getResponseDataOrThrow';
import type { Business, UpdateBusinessDto } from '../model/types';

/**
 * Приводим multipart-запрос к типу тела OpenAPI-клиента.
 * Генератор описывает binary-строку, но фактически ожидается FormData.
 */
function asMultipartBody(formData: FormData): never {
  return formData as never;
}

export async function getBusinessById(businessId: string): Promise<Business> {
  const res = await client.GET('/api/v1/admin/businesses/{id}', {
    params: { path: { id: businessId } },
  });

  return getResponseDataOrThrow(res);
}

export async function updateBusinessById(
  businessId: string,
  body: UpdateBusinessDto,
): Promise<Business> {
  const res = await client.PATCH('/api/v1/admin/businesses/{id}', {
    params: { path: { id: businessId } },
    body,
  });

  return getResponseDataOrThrow(res);
}

export async function uploadBusinessLogo(businessId: string, file: File): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await client.POST('/api/v1/admin/businesses/{id}/logo', {
    params: { path: { id: businessId } },
    body: asMultipartBody(formData),
  });

  if (res.error) {
    throw res.error;
  }
}

export async function uploadBusinessImage(businessId: string, file: File): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await client.POST('/api/v1/admin/businesses/{id}/image', {
    params: { path: { id: businessId } },
    body: asMultipartBody(formData),
  });

  if (res.error) {
    throw res.error;
  }
}

export async function deleteBusinessLogo(businessId: string): Promise<void> {
  const res = await client.DELETE('/api/v1/admin/businesses/{id}/logo', {
    params: { path: { id: businessId } },
  });

  if (res.error) {
    throw res.error;
  }
}

export async function deleteBusinessImage(businessId: string): Promise<void> {
  const res = await client.DELETE('/api/v1/admin/businesses/{id}/image', {
    params: { path: { id: businessId } },
  });

  if (res.error) {
    throw res.error;
  }
}
