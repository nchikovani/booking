import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@repo/ui';
import { useSessionStore } from '@entities/session';
import { SettingsPage } from './index';

const getMock = vi.hoisted(() => vi.fn());
const patchMock = vi.hoisted(() => vi.fn());
const postMock = vi.hoisted(() => vi.fn());
const deleteMock = vi.hoisted(() => vi.fn());

vi.mock('@api', () => ({
  client: {
    GET: getMock,
    PATCH: patchMock,
    POST: postMock,
    DELETE: deleteMock,
  },
}));

function renderSettingsPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const router = createMemoryRouter(
    [
      { path: '/', element: <div>home</div> },
      { path: '/settings', element: <SettingsPage /> },
    ],
    { initialEntries: ['/settings'] },
  );

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  );
}

function mockBusinessGet(overrides: Record<string, unknown> = {}) {
  getMock.mockResolvedValue({
    data: {
      data: {
        id: 'business-1',
        name: 'Салон',
        description: 'Описание',
        logoUrl: null,
        imageUrl: null,
        phone: '+79990000000',
        email: 'test@example.com',
        website: 'https://example.com',
        telegram: '@salon',
        vk: 'https://vk.com/salon',
        youtube: 'https://youtube.com/@salon',
        address: 'Москва',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
        ...overrides,
      },
    },
    error: undefined,
    response: new Response(null, { status: 200 }),
  });
}

beforeEach(() => {
  getMock.mockReset();
  patchMock.mockReset();
  postMock.mockReset();
  deleteMock.mockReset();

  useSessionStore.setState({
    accessToken: 'token',
    user: {
      id: 'user-1',
      email: null,
      firstName: null,
      lastName: null,
      businessId: 'business-1',
    },
  });
});

afterEach(() => {
  cleanup();
});

describe('SettingsPage', () => {
  it('загружает бизнес и сохраняет изменения через кнопку в header', async () => {
    const user = userEvent.setup();
    mockBusinessGet();
    patchMock.mockResolvedValueOnce({
      data: {
        data: {
          id: 'business-1',
          name: 'Салон premium',
          description: 'Описание',
          logoUrl: null,
          imageUrl: null,
          phone: '+79990000000',
          email: 'test@example.com',
          website: 'https://example.com',
          telegram: '@salon',
          vk: 'https://vk.com/salon',
          youtube: 'https://youtube.com/@salon',
          address: 'Москва',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z',
        },
      },
      error: undefined,
      response: new Response(null, { status: 200 }),
    });

    renderSettingsPage();

    await waitFor(() => {
      expect(screen.getByDisplayValue('Салон')).toBeInTheDocument();
    });

    await user.clear(screen.getByLabelText('Название компании'));
    await user.type(screen.getByLabelText('Название компании'), 'Салон premium');
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));

    await waitFor(() => {
      expect(patchMock).toHaveBeenCalledWith('/api/v1/admin/businesses/{id}', {
        params: { path: { id: 'business-1' } },
        body: expect.objectContaining({ name: 'Салон premium' }),
      });
    });
  });

  it('конвертирует пустое optional поле в пустую строку для DTO', async () => {
    const user = userEvent.setup();
    mockBusinessGet();
    patchMock.mockResolvedValueOnce({
      data: {
        data: {
          id: 'business-1',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z',
        },
      },
      error: undefined,
      response: new Response(null, { status: 200 }),
    });

    renderSettingsPage();

    await waitFor(() => {
      expect(screen.getByDisplayValue('https://example.com')).toBeInTheDocument();
    });

    await user.clear(screen.getByLabelText('Сайт'));
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));

    await waitFor(() => {
      expect(patchMock).toHaveBeenCalledWith('/api/v1/admin/businesses/{id}', {
        params: { path: { id: 'business-1' } },
        body: expect.objectContaining({ website: '' }),
      });
    });
  });

  it('загружает логотип через multipart endpoint', async () => {
    mockBusinessGet();
    mockBusinessGet({ logoUrl: 'https://cdn/logo.webp' });
    postMock.mockResolvedValueOnce({
      data: { status: 'success', data: null },
      error: undefined,
      response: new Response(null, { status: 200 }),
    });

    const { container } = renderSettingsPage();

    await waitFor(() => {
      expect(screen.getByText('Фотографии')).toBeInTheDocument();
    });

    const fileInputs = container.querySelectorAll('input[type="file"]');
    const logoInput = fileInputs.item(0);
    const file = new File(['binary'], 'logo.png', { type: 'image/png' });
    fireEvent.change(logoInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith('/api/v1/admin/businesses/{id}/logo', {
        params: { path: { id: 'business-1' } },
        body: expect.any(FormData),
      });
    });
  });
});
