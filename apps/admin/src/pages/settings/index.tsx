import { useTranslation } from 'react-i18next';
import { PageLayout } from '@widgets/page-layout';

export function SettingsPage() {
  const { t } = useTranslation();

  return <PageLayout title={t('nav.settings')}>{/* Контент страницы настроек */}</PageLayout>;
}
