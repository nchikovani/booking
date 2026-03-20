/* eslint-disable react-refresh/only-export-components -- конфигурация роутера и lazy-страницы */
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_REGISTER } from '@shared/constants/routes';
import { ErrorFallback } from '@/shared/ui/ErrorFallback';
import { NotFoundPage } from '@pages/not-found';
import { ProtectedLayout } from './ProtectedLayout';
import { RootLayout } from './RootLayout';
import { LoadingFallback } from '@shared/ui/LoadingFallback';

const LoginPage = lazy(() => import('@pages/login').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() =>
  import('@pages/register').then((m) => ({ default: m.RegisterPage })),
);

export const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    ),
    errorElement: <ErrorFallback />,
    children: [
      {
        path: ROUTE_LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTE_REGISTER,
        element: <RegisterPage />,
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: ROUTE_HOME,
            element: <RootLayout />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
