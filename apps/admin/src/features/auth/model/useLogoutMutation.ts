import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { client } from '@api';
import { useSessionStore } from '@entities/session';
import { ROUTE_LOGIN } from '@shared/constants/routes';
import { MUTATION_META_SKIP_GLOBAL_ERROR } from '@shared/constants/react-query-meta';

/**
 * Выход: POST /logout с cookie; 200 и 401 на сервере — норма (сессии уже нет).
 * Локально всегда сбрасываем store и ведём на логин. Сеть/5xx — snackbar, сессию не трогаем.
 */
export function useLogoutMutation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    meta: { [MUTATION_META_SKIP_GLOBAL_ERROR]: true },
    mutationFn: async () => {
      const res = await client.POST('/api/v1/admin/auth/logout', { body: undefined });
      const status = res.response.status;
      if (status === 200 || status === 401) {
        return;
      }
      throw res.error ?? new Error('logout failed');
    },
    onSuccess: () => {
      useSessionStore.getState().resetSession();
      navigate(ROUTE_LOGIN, { replace: true });
    },
    onError: () => {
      enqueueSnackbar(t('auth.errors.logoutFailed'), { variant: 'error' });
    },
  });
}
