import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { tokens } from '@repo/ui';
import { useSession } from '@entities/session';
import { LoadingFallback } from '@shared/ui/LoadingFallback';
import { ROUTE_HOME } from '@shared/constants/routes';

export function NotFoundPage() {
  const { t } = useTranslation();
  const { ready } = useSession();

  if (!ready) {
    return <LoadingFallback />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-bg p-8 text-text-primary">
      <Typography component="h1" variant="h1" color={tokens.color.textPrimary}>
        404
      </Typography>
      <Typography component="p" variant="body1" color={tokens.color.textSecondary}>
        {t('common.notFound')}
      </Typography>
      <MuiLink
        component={Link}
        to={ROUTE_HOME}
        variant="body1"
        color={tokens.color.primary}
        underline="hover"
      >
        {t('common.goHome')}
      </MuiLink>
    </div>
  );
}
