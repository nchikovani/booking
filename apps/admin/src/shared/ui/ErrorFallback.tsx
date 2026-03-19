import { useTranslation } from 'react-i18next';
import type { FallbackProps } from 'react-error-boundary';
import { useRouteError } from 'react-router-dom';

// Делаем пропсы необязательными, так как для роутера они не нужны
export function ErrorFallback({ error: boundaryError, resetErrorBoundary }: Partial<FallbackProps>) {
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-xl font-semibold">{t('common.error')}</h1>
      <pre className="max-w-full overflow-auto rounded bg-gray-100 p-4 text-sm text-gray-800">
        {error instanceof Error ? error.message : String(error)}
      </pre>
      <button
        type="button"
        onClick={handleReset}
        className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        {t('common.retry')}
      </button>
    </div>
  );
}