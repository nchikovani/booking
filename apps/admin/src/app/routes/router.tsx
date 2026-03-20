/* eslint-disable react-refresh/only-export-components -- конфигурация роутера и lazy-страницы */
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_SERVICES,
  ROUTE_EMPLOYEES,
  ROUTE_CALENDAR,
  ROUTE_CLIENTS,
  ROUTE_SETTINGS,
} from '@shared/constants/routes';
import { ErrorFallback } from '@/shared/ui/ErrorFallback';
import { NotFoundPage } from '@pages/not-found';
import { ProtectedLayout } from './ProtectedLayout';
import { AdminLayout } from '@widgets/admin-layout';
import { LoadingFallback } from '@shared/ui/LoadingFallback';

const LoginPage = lazy(() => import('@pages/login').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() =>
  import('@pages/register').then((m) => ({ default: m.RegisterPage })),
);
const HomePage = lazy(() => import('@pages/home').then((m) => ({ default: m.HomePage })));
const ServicesPage = lazy(() =>
  import('@pages/services').then((m) => ({ default: m.ServicesPage })),
);
const EmployeesPage = lazy(() =>
  import('@pages/employees').then((m) => ({ default: m.EmployeesPage })),
);
const CalendarPage = lazy(() =>
  import('@pages/calendar').then((m) => ({ default: m.CalendarPage })),
);
const ClientsPage = lazy(() => import('@pages/clients').then((m) => ({ default: m.ClientsPage })));
const SettingsPage = lazy(() =>
  import('@pages/settings').then((m) => ({ default: m.SettingsPage })),
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
            element: <AdminLayout />,
            children: [
              { path: ROUTE_HOME, element: <HomePage /> },
              { path: ROUTE_SERVICES, element: <ServicesPage /> },
              { path: ROUTE_EMPLOYEES, element: <EmployeesPage /> },
              { path: ROUTE_CALENDAR, element: <CalendarPage /> },
              { path: ROUTE_CLIENTS, element: <ClientsPage /> },
              { path: ROUTE_SETTINGS, element: <SettingsPage /> },
            ],
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
