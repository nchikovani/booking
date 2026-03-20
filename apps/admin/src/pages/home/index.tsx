import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { tokens, UiButton } from '@repo/ui';
import { useLogoutMutation } from '@features/auth';

export function HomePage() {
  const { t } = useTranslation();
  const logoutMutation = useLogoutMutation();

  return (
    <div className="flex items-center justify-between gap-4 p-8">
      <Typography component="h1" variant="h1" color={tokens.color.textPrimary}>
        {t('common.appName')}
      </Typography>
      <UiButton
        type="button"
        uiVariant="secondary"
        loading={logoutMutation.isPending}
        data-testid="logout-button"
        onClick={() => logoutMutation.mutate()}
      >
        {t('auth.logout')}
      </UiButton>
    </div>
  );
}
