/**
 * TS-словарь для использования CSS-переменных в коде.
 * import { tokens } from '@repo/ui'
 */
export const tokens = {
  color: {
    primary: 'var(--color-primary)',
    primaryDark: 'var(--color-primary-dark)',
    primaryLight: 'var(--color-primary-light)',
    accent: 'var(--color-accent)',
    error: 'var(--color-error)',
    borderDefault: 'var(--color-border-default)',
    borderStrong: 'var(--color-border-strong)',
    surfaceBg: 'var(--color-surface-bg)',
    surfaceCard: 'var(--color-surface-card)',
    surfaceElevated: 'var(--color-surface-elevated)',
    textPrimary: 'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    textTertiary: 'var(--color-text-tertiary)',
    overlay: 'var(--color-overlay)',
  },
} as const;
