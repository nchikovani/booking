import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-gray-600">{t('common.notFound')}</p>
      <Link to="/" className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
        {t('common.goHome')}
      </Link>
    </div>
  );
}
