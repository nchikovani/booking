import type { components } from '@api';

/** Пользователь админки после успешного GET /me (контракт OpenAPI). */
export type AdminAuthUser = components['schemas']['AuthUserDto'];
