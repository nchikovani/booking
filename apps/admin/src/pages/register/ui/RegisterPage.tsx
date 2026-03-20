import { Navigate } from 'react-router-dom';
import { useSession } from '@entities/session';
import { RegisterForm } from '@features/auth';
import { AuthScreenLayout } from '@widgets/auth-screen-layout';
import { ROUTE_HOME } from '@shared/constants/routes';
import { LoadingFallback } from '@shared/ui/LoadingFallback';

export function RegisterPage() {
  const { ready, isAuthenticated } = useSession();

  if (!ready) {
    return <LoadingFallback />;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTE_HOME} replace />;
  }

  return (
    <AuthScreenLayout>
      <RegisterForm />
    </AuthScreenLayout>
  );
}
