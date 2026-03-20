import type { ReactElement } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@repo/ui';
import { LoginPage } from '@pages/login';
import { RegisterPage } from '@pages/register';
import { ProtectedLayout } from './ProtectedLayout';
import * as sessionModule from '@entities/session';

vi.mock('@entities/session', async (importOriginal) => {
  const real = await importOriginal<typeof import('@entities/session')>();
  return { ...real, useSession: vi.fn() };
});

function RouterLog() {
  const loc = useLocation();
  return (
    <span data-testid="router-log">
      {loc.pathname}
      {loc.search}
    </span>
  );
}

function renderWithNav(ui: ReactElement) {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={qc}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>{ui}</SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  vi.mocked(sessionModule.useSession).mockReset();
});

afterEach(() => {
  cleanup();
});

describe('auth routes', () => {
  it('переход login → register (TC-9)', async () => {
    const user = userEvent.setup();
    vi.mocked(sessionModule.useSession).mockReturnValue({
      ready: true,
      isAuthenticated: false,
    });

    renderWithNav(
      <MemoryRouter initialEntries={['/login']}>
        <RouterLog />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: /Зарегистрироваться/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Регистрация/i })).toBeInTheDocument();
    });
    expect(screen.getByTestId('router-log').textContent).toContain('/register');
  });

  it('переход register → login (TC-9)', async () => {
    const user = userEvent.setup();
    vi.mocked(sessionModule.useSession).mockReturnValue({
      ready: true,
      isAuthenticated: false,
    });

    renderWithNav(
      <MemoryRouter initialEntries={['/register']}>
        <RouterLog />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: /Войти/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Вход/i })).toBeInTheDocument();
    });
    expect(screen.getByTestId('router-log').textContent).toContain('/login');
  });

  it('залогиненный на /login уходит на главную (TC-11)', async () => {
    vi.mocked(sessionModule.useSession).mockReturnValue({
      ready: true,
      isAuthenticated: true,
    });

    renderWithNav(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<div data-testid="home">home</div>} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('home')).toBeInTheDocument();
    });
  });

  it('гость на защищённом маршруте попадает на /login с returnUrl (TC-12)', async () => {
    vi.mocked(sessionModule.useSession).mockReturnValue({
      ready: true,
      isAuthenticated: false,
    });

    renderWithNav(
      <MemoryRouter initialEntries={['/settings']}>
        <RouterLog />
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route path="/settings" element={<div data-testid="secret">secret</div>} />
          </Route>
          <Route path="/login" element={<div data-testid="login-placeholder">login</div>} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('login-placeholder')).toBeInTheDocument();
    });
    await waitFor(() => {
      const log = screen.getByTestId('router-log').textContent ?? '';
      expect(log).toContain('/login');
      expect(log).toContain('returnUrl');
      expect(log).toContain('settings');
    });
  });
});
