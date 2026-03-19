import { useTranslation } from 'react-i18next';

export function LoadingFallback() {
  const { t } = useTranslation();
  return <div className="p-8">{t('common.loading')}</div>;
}
