import { useTranslation } from 'react-i18next';
import { PageLayout } from '@widgets/page-layout';

export function EmployeesPage() {
  const { t } = useTranslation();

  return <PageLayout title={t('nav.employees')}>{/* Контент страницы сотрудников */}</PageLayout>;
}
