import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t } = useTranslation();

  return <div className="text-2xl font-bold p-8">{t('common.appName')}</div>;
}
