import { THEME_STORAGE_KEY } from '@shared/constants/theme';

/**
 * Применяет тему до рендера React (избегаем мерцания при SSR/hydration).
 * Если в localStorage сохранена тема — использует её, иначе — prefers-color-scheme.
 * Вызывать в main.tsx до createRoot.
 */
export function initTheme(): void {
  if (typeof window === 'undefined') return;

  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  const mode =
    saved === 'light' || saved === 'dark'
      ? saved
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

  document.documentElement.setAttribute('data-theme', mode);
}
