const ADMIN_AUTH_PREFIX = '/api/v1/admin/auth';

/** Пути, для которых нужен refresh-cookie: `credentials: 'include'`. GET /me — только Bearer. */
const COOKIE_CREDENTIAL_PATHS: readonly string[] = [
  `${ADMIN_AUTH_PREFIX}/login`,
  `${ADMIN_AUTH_PREFIX}/register`,
  `${ADMIN_AUTH_PREFIX}/refresh`,
  `${ADMIN_AUTH_PREFIX}/logout`,
];

export function isAdminAuthCookiePath(pathname: string): boolean {
  return COOKIE_CREDENTIAL_PATHS.includes(pathname);
}

export function isAdminAuthRefreshPath(pathname: string): boolean {
  return pathname === `${ADMIN_AUTH_PREFIX}/refresh`;
}

export function isAdminAuthLogoutPath(pathname: string): boolean {
  return pathname === `${ADMIN_AUTH_PREFIX}/logout`;
}
