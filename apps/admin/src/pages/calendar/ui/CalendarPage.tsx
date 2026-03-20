import { useTranslation } from 'react-i18next';
import { PageLayout } from '@widgets/page-layout';

export function CalendarPage() {
  const { t } = useTranslation();

  return <PageLayout title={t('nav.calendar')}>{/* Контент страницы календаря */}</PageLayout>;
}
