import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@repo/ui';
import { LoginForm } from '@features/auth';
import { useSessionStore } from '@entities/session';

const postMock = vi.hoisted(() => vi.fn());

vi.mock('@api', () => ({
  client: {
    POST: postMock,
  },
}));

const fetchMeMock = vi.hoisted(() => vi.fn(() => Promise.resolve(true)));

vi.mock('@entities/session/api/bootstrap-session', () => ({
  fetchMeIntoStore: fetchMeMock,
}));

function renderLoginForm(initialPath = '/login') {
  const qc = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={qc}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <MemoryRouter initialEntries={[initialPath]}>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/" element={<div data-testid="after-auth-home">home</div>} />
              <Route
                path="/settings"
                element={<div data-testid="after-auth-settings">settings</div>}
              />
            </Routes>
          </MemoryRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  postMock.mockReset();
  fetchMeMock.mockReset();
  fetchMeMock.mockResolvedValue(true);
  useSessionStore.getState().resetSession();
});

afterEach(() => {
  cleanup();
});

function typePasswordLogin(user: ReturnType<typeof userEvent.setup>, value: string) {
  return user.type(screen.getByTestId('auth-login-password'), value);
}

describe('LoginForm', () => {
  it('после успешного входа редиректит на главную и кладёт токен (TC-1)', async () => {
    const user = userEvent.setup();
    postMock.mockResolvedValueOnce({
      data: { data: { accessToken: 'access-jwt' } },
      error: undefined,
      response: new Response(null, { status: 200 }),
    });

    renderLoginForm('/login');

    await user.type(screen.getByLabelText(/Почта/i), 'user@example.com');
    await typePasswordLogin(user, 'secret12');
    await user.click(screen.getByRole('button', { name: /Войти/i }));

    await waitFor(() => {
      expect(useSessionStore.getState().accessToken).toBe('access-jwt');
    });
    await waitFor(() => {
      expect(screen.getByTestId('after-auth-home')).toBeInTheDocument();
    });
    expect(postMock).toHaveBeenCalledWith('/api/v1/admin/auth/login', {
      body: { email: 'user@example.com', password: 'secret12' },
    });
  });

  it('после успешного входа с валидным returnUrl ведёт на целевой путь (TC-1, TC-13)', async () => {
    const user = userEvent.setup();
    postMock.mockResolvedValueOnce({
      data: { data: { accessToken: 'tok' } },
      error: undefined,
      response: new Response(null, { status: 200 }),
    });

    renderLoginForm('/login?returnUrl=%2Fsettings');

    await user.type(screen.getByLabelText(/Почта/i), 'user@example.com');
    await typePasswordLogin(user, 'secret12');
    await user.click(screen.getByRole('button', { name: /Войти/i }));

    await waitFor(() => {
      expect(screen.getByTestId('after-auth-settings')).toBeInTheDocument();
    });
  });

  it('показывает ошибку при неверных учётных данных и не ставит сессию (TC-2)', async () => {
    const user = userEvent.setup();
    postMock.mockResolvedValueOnce({
      data: undefined,
      error: { error: { code: 'INVALID_CREDENTIALS', message: 'bad' } },
      response: new Response(null, { status: 401 }),
    });

    renderLoginForm();

    await user.type(screen.getByLabelText(/Почта/i), 'user@example.com');
    await typePasswordLogin(user, 'wrongpwd1');
    await user.click(screen.getByRole('button', { name: /Войти/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Неверная почта или пароль/i);
    });
    expect(useSessionStore.getState().accessToken).toBeNull();
  });

  it('показывает отдельное сообщение при ACCOUNT_LOCKED (TC-15)', async () => {
    const user = userEvent.setup();
    postMock.mockResolvedValueOnce({
      data: undefined,
      error: { error: { code: 'ACCOUNT_LOCKED', message: 'locked' } },
      response: new Response(null, { status: 403 }),
    });

    renderLoginForm();

    await user.type(screen.getByLabelText(/Почта/i), 'user@example.com');
    await typePasswordLogin(user, 'secret12');
    await user.click(screen.getByRole('button', { name: /Войти/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/заблокирован/i);
    });
  });

  it('«Не помню пароль» не вызывает API (TC-10)', async () => {
    const user = userEvent.setup();
    renderLoginForm();

    await user.click(screen.getByRole('link', { name: /Не помню пароль/i }));

    expect(postMock).not.toHaveBeenCalled();
  });

  it('игнорирует опасный returnUrl и ведёт на главную (TC-13)', async () => {
    const user = userEvent.setup();
    postMock.mockResolvedValueOnce({
      data: { data: { accessToken: 'tok' } },
      error: undefined,
      response: new Response(null, { status: 200 }),
    });

    renderLoginForm('/login?returnUrl=https%3A%2F%2Fevil.com');

    await user.type(screen.getByLabelText(/Почта/i), 'user@example.com');
    await typePasswordLogin(user, 'secret12');
    await user.click(screen.getByRole('button', { name: /Войти/i }));

    await waitFor(() => {
      expect(screen.getByTestId('after-auth-home')).toBeInTheDocument();
    });
  });
});
