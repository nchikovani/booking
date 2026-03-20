import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { SnackbarProvider } from 'notistack';
import { queryClient } from '@shared/lib';
import { ErrorFallback } from '@shared/ui/ErrorFallback';
import { SessionProvider } from './providers/SessionProvider';
import { ThemeProvider } from './ThemeProvider';
import { router } from './routes';

export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <RouterProvider router={router} />
            </SnackbarProvider>
          </SessionProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
