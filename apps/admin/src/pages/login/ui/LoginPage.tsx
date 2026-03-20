import { Navigate } from 'react-router-dom';
import { useSession } from '@entities/session';
import { LoginForm } from '@features/auth';
import { AuthScreenLayout } from '@widgets/auth-screen-layout';
import { ROUTE_HOME } from '@shared/constants/routes';
import { LoadingFallback } from '@shared/ui/LoadingFallback';

export function LoginPage() {
  const { ready, isAuthenticated } = useSession();

  if (!ready) {
    return <LoadingFallback />;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTE_HOME} replace />;
  }

  return (
    <AuthScreenLayout>
      <LoginForm />
    </AuthScreenLayout>
  );
}
