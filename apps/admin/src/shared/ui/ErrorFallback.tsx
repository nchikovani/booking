import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import type { FallbackProps } from 'react-error-boundary';
import { useRouteError } from 'react-router-dom';
import { tokens, UiButton } from '@repo/ui';

// Делаем пропсы необязательными, так как для роутера они не нужны
export function ErrorFallback({
  error: boundaryError,
  resetErrorBoundary,
}: Partial<FallbackProps>) {
  const { t } = useTranslation();

  // Получаем ошибку из роутера, если она есть
  const routeError = useRouteError();
  const error = boundaryError || routeError;

  const handleReset = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      // Если это ошибка роутера, просто перезагружаем страницу или переходим на главную
      window.location.href = '/';
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-bg p-8">
      <Typography component="h1" variant="h2" color={tokens.color.textPrimary}>
        {t('common.error')}
      </Typography>
      <Typography
        component="pre"
        variant="caption"
        color={tokens.color.textSecondary}
        className="max-w-full overflow-auto rounded-lg bg-surface-elevated p-4 whitespace-pre-wrap"
      >
        {error instanceof Error ? error.message : String(error)}
      </Typography>
      <UiButton type="button" uiVariant="primary" onClick={handleReset}>
        {t('common.retry')}
      </UiButton>
    </div>
  );
}
