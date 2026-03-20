import { client } from '@api';
import { useSessionStore } from '../model/session-store';

/**
 * Холодный старт: refresh (если нет access) → GET /me. Без навигации (Feature 3.1 §4.2).
 */
export async function runSessionBootstrap(): Promise<void> {
  const store = useSessionStore.getState();
  if (!store.accessToken) {
    const res = await client.POST('/api/v1/admin/auth/refresh', { body: undefined });
    const token = res.data?.data && 'accessToken' in res.data.data ? res.data.data.accessToken : undefined;

    if (typeof token === 'string') {
      useSessionStore.getState().setAccessToken(token);
    }
  }

  const accessToken = useSessionStore.getState().accessToken;
  if (!accessToken) {
    return;
  }

  const me = await client.GET('/api/v1/admin/auth/me', {});
  if (me.data) {
    useSessionStore.getState().setUser(me.data.data);
  } else {
    useSessionStore.getState().resetSession();
  }
}

/**
 * После login/register: access уже в store → обязательный GET /me.
 * @returns false если /me не удался (store сброшен).
 */
export async function fetchMeIntoStore(): Promise<boolean> {
  const me = await client.GET('/api/v1/admin/auth/me', {});
  if (me.data) {
    useSessionStore.getState().setUser(me.data.data);
    return true;
  }
  useSessionStore.getState().resetSession();
  return false;
}
