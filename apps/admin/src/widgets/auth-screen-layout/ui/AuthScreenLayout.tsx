import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { tokens } from '@repo/ui';

type AuthScreenLayoutProps = {
  children: ReactNode;
};

export function AuthScreenLayout({ children }: AuthScreenLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-surface-bg text-text-primary">
      <header className="flex items-center justify-center gap-3 border-b border-border-default px-6 py-6">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-primary"
          aria-hidden
        ></div>
        <Typography component="p" variant="h1" color={tokens.color.textPrimary}>
          {t('auth.layout.brand')}
        </Typography>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div className={`w-[420px] rounded-xl border border-border-default bg-surface-card p-8`}>
          {children}
        </div>
      </main>

      <footer className="flex justify-center border-t border-border-default px-4 py-4">
        <Typography component="p" variant="caption" color={tokens.color.textTertiary}>
          {t('auth.layout.footer')}
        </Typography>
      </footer>
    </div>
  );
}
