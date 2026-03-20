import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { UiButton, tokens } from '@repo/ui';
import { useBusinessQuery } from '@entities/business';
import { useSessionStore } from '@entities/session';
import { BusinessSettingsForm } from '@features/business-settings';
import { LoadingFallback } from '@shared/ui/LoadingFallback';
import { PageLayout } from '@widgets/page-layout';

export function SettingsPage() {
  const { t } = useTranslation();
  const businessId = useSessionStore((state) => state.user?.businessId ?? null);
  const businessQuery = useBusinessQuery(businessId);

  if (!businessId) {
    return (
      <PageLayout title={t('nav.settings')}>
        <div className="p-6">
          <Typography variant="body1" color={tokens.color.textSecondary}>
            {t('settings.messages.businessIdMissing')}
          </Typography>
        </div>
      </PageLayout>
    );
  }

  if (businessQuery.isLoading && !businessQuery.data) {
    return (
      <PageLayout title={t('nav.settings')}>
        <LoadingFallback />
      </PageLayout>
    );
  }

  if (businessQuery.isError && !businessQuery.data) {
    return (
      <PageLayout title={t('nav.settings')}>
        <div className="flex h-full items-center justify-center p-6">
          <div className="flex max-w-md flex-col items-center gap-4 text-center">
            <Typography variant="body1" color={tokens.color.textSecondary}>
              {t('settings.messages.loadError')}
            </Typography>
            <UiButton type="button" uiVariant="secondary" onClick={() => void businessQuery.refetch()}>
              {t('common.retry')}
            </UiButton>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!businessQuery.data) {
    return null;
  }

  return (
    <PageLayout
      title={t('nav.settings')}
      actions={
        <UiButton type="submit" form="business-settings-form" uiVariant="primary">
          {t('settings.actions.save')}
        </UiButton>
      }
    >
      <BusinessSettingsForm businessId={businessId} business={businessQuery.data} />
    </PageLayout>
  );
}
