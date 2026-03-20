import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_REGISTER } from '@shared/constants/routes';

/**
 * Безопасная нормализация `returnUrl` для редиректа после входа (Feature 3.1 §4.4).
 *
 * Разрешены только внутренние пути текущего SPA: начинаются с `/`, не `//`, без `://` в пути
 * (закодированные схемы вида `/%68ttp://`), не совпадают с ROUTE_HOME, ROUTE_LOGIN, ROUTE_REGISTER.
 * Иначе `null` (fallback на home).
 */
export function parseReturnUrl(raw: string | null | undefined): string | null {
  if (raw == null) {
    return null;
  }
  const trimmed = raw.trim();
  if (trimmed === '') {
    return null;
  }

  let decoded: string;
  try {
    decoded = decodeURIComponent(trimmed);
  } catch {
    return null;
  }

  if (!decoded.startsWith('/') || decoded.startsWith('//')) {
    return null;
  }

  // Отклоняем пути, содержащие схему (например /%68ttp://evil.com после decode → /http://evil.com).
  if (decoded.includes('://')) {
    return null;
  }

  const pathOnly = decoded.split('?')[0] ?? decoded;
  if (pathOnly === ROUTE_HOME || pathOnly === ROUTE_LOGIN || pathOnly === ROUTE_REGISTER) {
    return null;
  }

  return decoded;
}
