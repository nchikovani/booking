import { useTranslation } from 'react-i18next';
import { PageLayout } from '@widgets/page-layout';

export function ServicesPage() {
  const { t } = useTranslation();

  return <PageLayout title={t('nav.services')}>{/* Контент страницы услуг */}</PageLayout>;
}
