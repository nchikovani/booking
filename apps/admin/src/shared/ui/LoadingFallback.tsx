import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';

export function LoadingFallback() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-surface-bg p-8">
      <CircularProgress
        aria-label={t('common.loading')}
        sx={{ animationDuration: '1200ms' }}
        size={48}
      />
    </div>
  );
}
