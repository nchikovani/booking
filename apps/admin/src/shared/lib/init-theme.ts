import { STORAGE_KEY_THEME } from '@shared/constants/storage';

/**
 * Применяет тему до рендера React (избегаем мерцания при смене темы).
 * Если в localStorage сохранена тема — использует её, иначе — prefers-color-scheme.
 * Вызывать в main.tsx до createRoot.
 */
export function initTheme(): void {
  if (typeof window === 'undefined') return;

  const saved = localStorage.getItem(STORAGE_KEY_THEME);
  const mode =
    saved === 'light' || saved === 'dark'
      ? saved
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

  document.documentElement.setAttribute('data-theme', mode);
}
