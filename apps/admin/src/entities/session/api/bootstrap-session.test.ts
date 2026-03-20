import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockPost = vi.hoisted(() => vi.fn());
const mockGet = vi.hoisted(() => vi.fn());

vi.mock('@api', () => ({
  client: { POST: mockPost, GET: mockGet },
}));

const mockSetAccessToken = vi.hoisted(() => vi.fn());
const mockSetUser = vi.hoisted(() => vi.fn());
const mockResetSession = vi.hoisted(() => vi.fn());

let storeAccessToken: string | null = null;

vi.mock('../model/session-store', () => ({
  useSessionStore: {
    getState: () => ({
      get accessToken() {
        return storeAccessToken;
      },
      setAccessToken: mockSetAccessToken.mockImplementation((t: string | null) => {
        storeAccessToken = t;
      }),
      setUser: mockSetUser,
      resetSession: mockResetSession.mockImplementation(() => {
        storeAccessToken = null;
      }),
    }),
  },
}));

import { fetchMeIntoStore, runSessionBootstrap } from './bootstrap-session';

const MOCK_TOKEN = 'access-token-123';
const MOCK_USER = { id: 1, email: 'admin@test.com' };

beforeEach(() => {
  storeAccessToken = null;
  mockPost.mockReset();
  mockGet.mockReset();
  mockSetAccessToken.mockClear();
  mockSetUser.mockClear();
  mockResetSession.mockClear();
});

describe('runSessionBootstrap', () => {
  it('при наличии токена в store пропускает refresh и вызывает GET /me (TC-7)', async () => {
    storeAccessToken = MOCK_TOKEN;
    mockGet.mockResolvedValueOnce({ data: MOCK_USER });

    await runSessionBootstrap();

    expect(mockPost).not.toHaveBeenCalled();
    expect(mockGet).toHaveBeenCalledWith('/api/v1/admin/auth/me', {});
    expect(mockSetUser).toHaveBeenCalledWith(MOCK_USER);
  });

  it('без токена: refresh успешен → GET /me → пользователь в store (TC-7)', async () => {
    mockPost.mockResolvedValueOnce({ data: { accessToken: MOCK_TOKEN } });
    mockGet.mockResolvedValueOnce({ data: MOCK_USER });

    await runSessionBootstrap();

    expect(mockPost).toHaveBeenCalledWith('/api/v1/admin/auth/refresh', { body: undefined });
    expect(mockSetAccessToken).toHaveBeenCalledWith(MOCK_TOKEN);
    expect(mockGet).toHaveBeenCalledWith('/api/v1/admin/auth/me', {});
    expect(mockSetUser).toHaveBeenCalledWith(MOCK_USER);
    expect(mockResetSession).not.toHaveBeenCalled();
  });

  it('без токена: refresh не удался → гость, /me не вызывается (TC-7)', async () => {
    mockPost.mockResolvedValueOnce({ data: undefined });

    await runSessionBootstrap();

    expect(mockPost).toHaveBeenCalled();
    expect(mockSetAccessToken).not.toHaveBeenCalled();
    expect(mockGet).not.toHaveBeenCalled();
    expect(mockResetSession).not.toHaveBeenCalled();
  });

  it('без токена: refresh успешен, но GET /me упал → resetSession (TC-7)', async () => {
    mockPost.mockResolvedValueOnce({ data: { accessToken: MOCK_TOKEN } });
    mockGet.mockResolvedValueOnce({ data: undefined, error: { code: 'UNAUTHORIZED' } });

    await runSessionBootstrap();

    expect(mockSetAccessToken).toHaveBeenCalledWith(MOCK_TOKEN);
    expect(mockGet).toHaveBeenCalled();
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockResetSession).toHaveBeenCalled();
  });
});

describe('fetchMeIntoStore', () => {
  it('GET /me успешен → пользователь в store, возвращает true', async () => {
    storeAccessToken = MOCK_TOKEN;
    mockGet.mockResolvedValueOnce({ data: MOCK_USER });

    const result = await fetchMeIntoStore();

    expect(result).toBe(true);
    expect(mockSetUser).toHaveBeenCalledWith(MOCK_USER);
    expect(mockResetSession).not.toHaveBeenCalled();
  });

  it('GET /me не удался → resetSession, возвращает false', async () => {
    storeAccessToken = MOCK_TOKEN;
    mockGet.mockResolvedValueOnce({ data: undefined, error: { code: 'UNAUTHORIZED' } });

    const result = await fetchMeIntoStore();

    expect(result).toBe(false);
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockResetSession).toHaveBeenCalled();
  });
});
