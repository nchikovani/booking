import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@repo/ui';
import { RegisterForm } from '@features/auth';
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

function renderRegisterForm() {
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
          <MemoryRouter initialEntries={['/register']}>
            <Routes>
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/" element={<div data-testid="after-auth-home">home</div>} />
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

function typeIn(user: ReturnType<typeof userEvent.setup>, selector: string, value: string) {
  return user.type(screen.getByTestId(selector), value);
}

describe('RegisterForm', () => {
  it('успешная регистрация ставит токен и ведёт на главную (TC-3)', async () => {
    const user = userEvent.setup();
    postMock.mockResolvedValueOnce({
      data: { data: { accessToken: 'reg-jwt' } },
      error: undefined,
      response: new Response(null, { status: 201 }),
    });

    renderRegisterForm();

    await user.type(screen.getByLabelText(/Почта/i), 'new@example.com');
    await typeIn(user, 'auth-register-password', 'secret12');
    await typeIn(user, 'auth-register-password-confirm', 'secret12');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: /Зарегистрироваться/i }));

    await waitFor(() => {
      expect(useSessionStore.getState().accessToken).toBe('reg-jwt');
    });
    await waitFor(() => {
      expect(screen.getByTestId('after-auth-home')).toBeInTheDocument();
    });
  });

  it('показывает конфликт при занятом email (TC-4)', async () => {
    const user = userEvent.setup();
    postMock.mockResolvedValueOnce({
      data: undefined,
      error: { error: { code: 'EMAIL_ALREADY_EXISTS', message: 'dup' } },
      response: new Response(null, { status: 409 }),
    });

    renderRegisterForm();

    await user.type(screen.getByLabelText(/Почта/i), 'taken@example.com');
    await typeIn(user, 'auth-register-password', 'secret12');
    await typeIn(user, 'auth-register-password-confirm', 'secret12');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: /Зарегистрироваться/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/уже зарегистрирован/i);
    });
  });

  it('без чекбокса согласия не отправляет форму (TC-5)', async () => {
    const user = userEvent.setup();
    renderRegisterForm();

    await user.type(screen.getByLabelText(/Почта/i), 'a@b.c');
    await typeIn(user, 'auth-register-password', 'secret12');
    await typeIn(user, 'auth-register-password-confirm', 'secret12');
    await user.click(screen.getByRole('button', { name: /Зарегистрироваться/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/согласие/i);
    });
    expect(postMock).not.toHaveBeenCalled();
  });

  it('при разных паролях не вызывает API и показывает ошибку подтверждения (TC-6)', async () => {
    const user = userEvent.setup();
    renderRegisterForm();

    await user.type(screen.getByLabelText(/Почта/i), 'a@b.c');
    await typeIn(user, 'auth-register-password', 'secret12');
    await typeIn(user, 'auth-register-password-confirm', 'other12');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: /Зарегистрироваться/i }));

    await waitFor(() => {
      expect(screen.getByText(/Пароли не совпадают/i)).toBeInTheDocument();
    });
    expect(postMock).not.toHaveBeenCalled();
  });

  it('показывает ACCOUNT_LOCKED отдельным текстом (TC-15)', async () => {
    const user = userEvent.setup();
    postMock.mockResolvedValueOnce({
      data: undefined,
      error: { error: { code: 'ACCOUNT_LOCKED', message: 'locked' } },
      response: new Response(null, { status: 403 }),
    });

    renderRegisterForm();

    await user.type(screen.getByLabelText(/Почта/i), 'u@example.com');
    await typeIn(user, 'auth-register-password', 'secret12');
    await typeIn(user, 'auth-register-password-confirm', 'secret12');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: /Зарегистрироваться/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/заблокирован/i);
    });
  });
});
