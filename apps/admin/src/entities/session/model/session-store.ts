import { create } from 'zustand';
import type { AdminAuthUser } from './types';

/**
 * Сессия админки: access token и профиль после /me.
 * Bearer в Zustand — намеренное исключение из правила «серверные данные в React Query»:
 * секрет нельзя класть в кеш/ persisted state; только память вкладки (Feature 3.1).
 */
export type SessionState = {
  accessToken: string | null;
  user: AdminAuthUser | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: AdminAuthUser | null) => void;
  resetSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (accessToken) => set({ accessToken }),
  setUser: (user) => set({ user }),
  resetSession: () => set({ accessToken: null, user: null }),
}));
