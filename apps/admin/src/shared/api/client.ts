import createClient, { type Middleware } from 'openapi-fetch';
import { router } from '@app/routes';
import { useSessionStore } from '@entities/session';
import type { paths } from './openapi.generated';
import { ROUTE_LOGIN } from '@shared/constants/routes';
import { parseReturnUrl } from '@shared/lib/parseReturnUrl';
import { isAdminAuthCookiePath, isAdminAuthLogoutPath, isAdminAuthRefreshPath } from './auth-paths';

export type AdminOpenApiClient = ReturnType<typeof createClient<paths>>;

/** Маркер повторного запроса после refresh — второй 401 ведёт к разлогину без цикла. */
const AUTH_RETRY_HEADER = 'X-Admin-Auth-Refresh-Retry';

const viteApiUrl = import.meta.env.VITE_API_URL as string | undefined;

type RefreshBody = { accessToken?: string };

function pathnameFromRequest(request: Request): string {
  try {
    return new URL(request.url).pathname;
  } catch {
    return '';
  }
}

/** Сброс сессии и переход на логин с безопасным returnUrl (только внутренние пути). */
function onSessionExpired() {
  useSessionStore.getState().resetSession();
  const path = `${window.location.pathname}${window.location.search}`;
  const safe = parseReturnUrl(path);
  const suffix = safe ? `?returnUrl=${encodeURIComponent(safe)}` : '';
  router.navigate(`${ROUTE_LOGIN}${suffix}`, { replace: true });
}

/**
 * OpenAPI-клиент: Bearer из Zustand, cookie на auth-маршрутах, single-flight refresh при 401.
 * Исключение FSD: импорт `entities/session` и `app/routes`.
 */
function createAdminApiClient(): AdminOpenApiClient {
  const baseUrl = viteApiUrl ?? '';
  const client = createClient<paths>({ baseUrl });

  /** Один общий Promise refresh для параллельных 401 (single-flight). */
  let refreshPromise: Promise<string | null> | null = null;

  function refreshAccessToken(fetchImpl: typeof fetch): Promise<string | null> {
    if (!refreshPromise) {
      const url = `${baseUrl.replace(/\/$/, '')}/api/v1/admin/auth/refresh`;
      const run = async (): Promise<string | null> => {
        try {
          const res = await fetchImpl(url, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
          if (!res.ok) {
            return null;
          }
          const json = (await res.json()) as RefreshBody;
          return typeof json.accessToken === 'string' ? json.accessToken : null;
        } catch {
          return null;
        }
      };
      refreshPromise = run().finally(() => {
        refreshPromise = null;
      });
    }
    return refreshPromise;
  }

  const middleware: Middleware = {
    /** Подмешиваем Authorization и credentials для login/register/refresh/logout. */
    async onRequest({ request }) {
      const pathname = pathnameFromRequest(request);
      const token = useSessionStore.getState().accessToken;
      const needsCookie = isAdminAuthCookiePath(pathname);
      const needsBearer = Boolean(token);

      if (!needsBearer && !needsCookie) {
        return;
      }

      const headers = new Headers(request.headers);
      if (needsBearer && token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return new Request(request, {
        headers,
        ...(needsCookie ? { credentials: 'include' as RequestCredentials } : {}),
      });
    },

    /**
     * 401: не refresh для самого /refresh и /logout; при повторе после retry — разлогин.
     * Иначе single-flight refresh, обновление access в store, один повтор исходного запроса.
     */
    async onResponse({ request, response, options }) {
      if (response.status !== 401) {
        return;
      }

      const pathname = pathnameFromRequest(request);
      if (isAdminAuthRefreshPath(pathname) || isAdminAuthLogoutPath(pathname)) {
        return;
      }

      if (request.headers.get(AUTH_RETRY_HEADER) === '1') {
        onSessionExpired();
        return;
      }

      const token = await refreshAccessToken(options.fetch);
      if (!token) {
        onSessionExpired();
        return;
      }

      useSessionStore.getState().setAccessToken(token);

      const headers = new Headers(request.headers);
      headers.set('Authorization', `Bearer ${token}`);
      headers.set(AUTH_RETRY_HEADER, '1');

      const retryRequest = new Request(request, { headers });
      const retryResponse = await options.fetch(retryRequest);
      if (retryResponse.status === 401) {
        onSessionExpired();
      }
      return retryResponse;
    },
  };

  client.use(middleware);
  return client;
}

export const client = createAdminApiClient();
