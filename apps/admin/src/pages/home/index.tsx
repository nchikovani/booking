import { useTranslation } from 'react-i18next';
import { PageLayout } from '@widgets/page-layout';

export function HomePage() {
  const { t } = useTranslation();

  return <PageLayout title={t('nav.dashboard')}>{/* Контент дашборда */}</PageLayout>;
}
