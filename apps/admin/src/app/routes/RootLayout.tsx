import { lazy, Suspense } from 'react';
import { LoadingFallback } from './LoadingFallback';

const HomePage = lazy(() => import('@pages/home').then((m) => ({ default: m.HomePage })));

export function RootLayout() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomePage />
    </Suspense>
  );
}
