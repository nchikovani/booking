import { create } from 'zustand';
import { THEME_STORAGE_KEY } from '@shared/constants/theme';

export type ThemeMode = 'light' | 'dark';

interface ThemeStore {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const getSystemTheme = (): ThemeMode =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

function getStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === 'light' || saved === 'dark' ? saved : null;
}

function applyTheme(mode: ThemeMode) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_STORAGE_KEY, mode);
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
