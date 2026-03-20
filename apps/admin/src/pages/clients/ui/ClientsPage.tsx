import { useTranslation } from 'react-i18next';
import { PageLayout } from '@widgets/page-layout';

export function ClientsPage() {
  const { t } = useTranslation();

  return <PageLayout title={t('nav.clients')}>{/* Контент страницы клиентов */}</PageLayout>;
}
