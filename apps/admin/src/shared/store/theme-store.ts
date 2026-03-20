import { create } from 'zustand';
import { STORAGE_KEY_THEME } from '@shared/constants/storage';

export type ThemeMode = 'light' | 'dark';

interface ThemeStore {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const getSystemTheme = (): ThemeMode =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

function getStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(STORAGE_KEY_THEME);
  return saved === 'light' || saved === 'dark' ? saved : null;
}

function applyTheme(mode: ThemeMode) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_THEME, mode);
  document.documentElement.setAttribute('data-theme', mode);
}

export const useThemeStore = create<ThemeStore>()((set) => ({
  mode: getStoredTheme() ?? getSystemTheme(),
  setMode: (mode) => {
    applyTheme(mode);
    set({ mode });
  },
  toggleMode: () =>
    set((state) => {
      const next = state.mode === 'light' ? 'dark' : 'light';
      applyTheme(next);
      return { mode: next };
    }),
}));
