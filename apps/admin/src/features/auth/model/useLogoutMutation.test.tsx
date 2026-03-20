import type { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { useLogoutMutation } from './useLogoutMutation';
import { useSessionStore } from '@entities/session';

const postMock = vi.hoisted(() => vi.fn());

vi.mock('@api', () => ({
  client: {
    POST: postMock,
  },
}));

function wrapper({ children }: { children: ReactNode }) {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return (
    <QueryClientProvider client={qc}>
      <SnackbarProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

beforeEach(() => {
  postMock.mockReset();
  useSessionStore.getState().resetSession();
});

describe('useLogoutMutation', () => {
  it('после 200 сбрасывает сессию (TC-8)', async () => {
    useSessionStore.getState().setAccessToken('x');
    postMock.mockResolvedValueOnce({
      data: undefined,
      error: undefined,
      response: new Response(null, { status: 200 }),
    });

    const { result } = renderHook(() => useLogoutMutation(), { wrapper });

    result.current.mutate();

    await waitFor(() => {
      expect(useSessionStore.getState().accessToken).toBeNull();
    });
    expect(postMock).toHaveBeenCalledWith('/api/v1/admin/auth/logout', { body: undefined });
  });

  it('после 401 на logout тоже сбрасывает сессию (TC-8)', async () => {
    useSessionStore.getState().setAccessToken('x');
    postMock.mockResolvedValueOnce({
      data: undefined,
      error: { error: { code: 'UNAUTHORIZED', message: 'no cookie' } },
      response: new Response(null, { status: 401 }),
    });

    const { result } = renderHook(() => useLogoutMutation(), { wrapper });

    result.current.mutate();

    await waitFor(() => {
      expect(useSessionStore.getState().accessToken).toBeNull();
    });
  });
});
