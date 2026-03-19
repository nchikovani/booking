import { createBrowserRouter, Outlet } from 'react-router-dom';
import { RootLayout } from './RootLayout';
import { NotFoundPage } from '@pages/not-found';
import { ErrorFallback } from '@/shared/ui/ErrorFallback';

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: '/',
        element: <RootLayout />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
