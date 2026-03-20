import { beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * openapi-fetch захватывает `globalThis.fetch` при вызове `createClient()` (не при каждом запросе),
 * поэтому мок нужно установить через vi.hoisted — до инициализации модуля client.ts.
 */
const fetchMock = vi.hoisted(() => {
  const fn = vi.fn();
  vi.stubGlobal('fetch', fn);
  return fn;
});

const mockState = vi.hoisted(() => ({
  accessToken: null as string | null,
  setAccessToken: vi.fn((t: string | null) => {
    mockState.accessToken = t;
  }),
  resetSession: vi.fn(() => {
    mockState.accessToken = null;
  }),
  user: null,
  setUser: vi.fn(),
}));

vi.mock('@entities/session', () => ({
  useSessionStore: { getState: () => mockState },
}));

const mockNavigate = vi.hoisted(() => vi.fn());
vi.mock('@app/routes', () => ({ router: { navigate: mockNavigate } }));

import { client } from './client';

const BASE = 'http://test.localhost';
const ME_URL = `${BASE}/api/v1/admin/auth/me`;
const REFRESH_URL = `${BASE}/api/v1/admin/auth/refresh`;

/** Конструирует минимальный mock Response. */
function makeResponse(status: number, body: unknown = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * openapi-fetch передаёт fetch() объект Request, а refreshAccessToken — строку URL.
 * Этот хелпер нормализует оба формата.
 */
function getUrl(input: string | Request): string {
  return typeof input === 'string' ? input : input.url;
}

beforeEach(() => {
  mockState.accessToken = null;
  mockState.setAccessToken.mockClear();
  mockState.resetSession.mockClear();
  mockNavigate.mockClear();
  fetchMock.mockReset();
});

describe('401-перехватчик (TC-14)', () => {
  it('успешный refresh после 401 → повтор исходного запроса с новым токеном', async () => {
    fetchMock.mockImplementation(async (input) => {
      const url = getUrl(input as string | Request);
      if (url.includes('/refresh')) {
        return makeResponse(200, { accessToken: 'new-token' });
      }
      if ((input as Request).headers?.get('X-Admin-Auth-Refresh-Retry') === '1') {
        return makeResponse(200, { id: 1 });
      }
      return makeResponse(401);
    });

    await client.GET('/api/v1/admin/auth/me', {});

    expect(mockState.setAccessToken).toHaveBeenCalledWith('new-token');
    const calls = fetchMock.mock.calls.map((c) => getUrl(c[0] as string | Request));
    expect(calls.some((u) => u.includes('/refresh'))).toBe(true);
    expect(calls.filter((u) => u.includes('/me')).length).toBe(2);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('401 на /refresh → не запускает повторный refresh', async () => {
    fetchMock.mockImplementation(async () => makeResponse(401));

    await client.POST('/api/v1/admin/auth/refresh', { body: undefined });

    const calls = fetchMock.mock.calls.map((c) => getUrl(c[0] as string | Request));
    expect(calls.filter((u) => u.includes('/refresh')).length).toBe(1);
    expect(mockState.resetSession).not.toHaveBeenCalled();
  });

  it('refresh не удался (не-ok) → onSessionExpired: resetSession + navigate', async () => {
    fetchMock.mockImplementation(async () => makeResponse(401));

    await client.GET('/api/v1/admin/auth/me', {});

    expect(mockState.resetSession).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('/login'), expect.anything());
  });

  it('второй 401 с retry-header → onSessionExpired без дополнительного refresh', async () => {
    fetchMock.mockImplementation(async (input) => {
      const url = getUrl(input as string | Request);
      if (url.includes('/refresh')) {
        return makeResponse(200, { accessToken: 'new-token' });
      }
      return makeResponse(401);
    });

    await client.GET('/api/v1/admin/auth/me', {});

    const refreshCalls = fetchMock.mock.calls.filter((c) =>
      getUrl(c[0] as string | Request).includes('/refresh'),
    );
    expect(refreshCalls.length).toBe(1);
    expect(mockState.resetSession).toHaveBeenCalledTimes(1);
  });

  it('два параллельных 401 → ровно один вызов /refresh (single-flight)', async () => {
    fetchMock.mockImplementation(async (input) => {
      const url = getUrl(input as string | Request);
      if (url.includes('/refresh')) {
        return makeResponse(200, { accessToken: 'shared-token' });
      }
      if ((input as Request).headers?.get('X-Admin-Auth-Refresh-Retry') === '1') {
        return makeResponse(200, { id: 1 });
      }
      return makeResponse(401);
    });

    await Promise.all([
      client.GET('/api/v1/admin/auth/me', {}),
      client.GET('/api/v1/admin/auth/me', {}),
    ]);

    const refreshCalls = fetchMock.mock.calls.filter((c) =>
      getUrl(c[0] as string | Request).includes('/refresh'),
    );
    expect(refreshCalls.length).toBe(1);
    expect(mockState.setAccessToken).toHaveBeenCalledWith('shared-token');
  });
});

describe('onRequest middleware', () => {
  it('подставляет Bearer из store, если токен есть', async () => {
    mockState.accessToken = 'my-token';
    fetchMock.mockResolvedValueOnce(makeResponse(200, { id: 1 }));

    await client.GET('/api/v1/admin/auth/me', {});

    const sentRequest = fetchMock.mock.calls[0]![0] as Request;
    expect(sentRequest.headers.get('Authorization')).toBe('Bearer my-token');
  });

  it('не добавляет Authorization, если токена нет', async () => {
    mockState.accessToken = null;
    fetchMock.mockImplementation(async () => makeResponse(401));

    await client.GET('/api/v1/admin/auth/me', {});

    const firstRequest = fetchMock.mock.calls[0]![0] as Request;
    expect(firstRequest.headers.get('Authorization')).toBeNull();
  });
});

describe('ME_URL constant', () => {
  it('базовый URL соответствует VITE_API_URL', () => {
    expect(ME_URL).toBe('http://test.localhost/api/v1/admin/auth/me');
    expect(REFRESH_URL).toBe('http://test.localhost/api/v1/admin/auth/refresh');
  });
});
