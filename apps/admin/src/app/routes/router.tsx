import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './RootLayout';
import { NotFoundPage } from '@pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
