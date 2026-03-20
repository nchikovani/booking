import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSession } from '@entities/session';
import { ROUTE_LOGIN } from '@shared/constants/routes';
import { parseReturnUrl } from '@shared/lib/parseReturnUrl';
import { LoadingFallback } from '@shared/ui/LoadingFallback';

/**
 * Защищённые маршруты: до готовности сессии — общий loading; гость — на логин с returnUrl.
 */
export function ProtectedLayout() {
  const { ready, isAuthenticated } = useSession();
  const location = useLocation();

  if (!ready) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated) {
    const full = `${location.pathname}${location.search}`;
    const safe = parseReturnUrl(full);
    const qs = safe ? `?returnUrl=${encodeURIComponent(safe)}` : '';
    return <Navigate to={`${ROUTE_LOGIN}${qs}`} replace />;
  }

  return <Outlet />;
}
