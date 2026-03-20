import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { client } from '@api';
import type { components } from '@api';
import { useSessionStore } from '@entities/session';
import { fetchMeIntoStore } from '@entities/session/api/bootstrap-session';
import { ROUTE_HOME } from '@shared/constants/routes';
import { MUTATION_META_SKIP_GLOBAL_ERROR } from '@shared/constants/react-query-meta';
import { parseReturnUrl } from '@shared/lib/parseReturnUrl';
import { mapAuthApiErrorToMessage } from '../lib/map-auth-form-error';

type RegisterDto = components['schemas']['RegisterDto'];

export function useRegisterMutation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    meta: { [MUTATION_META_SKIP_GLOBAL_ERROR]: true },
    mutationFn: async (body: Pick<RegisterDto, 'email' | 'password'>) => {
      const res = await client.POST('/api/v1/admin/auth/register', { body });
      if (res.error || !res.data?.data.accessToken) {
        throw res.error ?? new Error('network');
      }
      return res.data;
    },
    onSuccess: async (data) => {
      useSessionStore.getState().setAccessToken(data.data.accessToken);
      const ok = await fetchMeIntoStore();
      if (!ok) {
        enqueueSnackbar(t('auth.errors.meFailed'), { variant: 'error' });
        return;
      }
      const rawReturn = searchParams.get('returnUrl');
      const dest = parseReturnUrl(rawReturn) ?? ROUTE_HOME;
      navigate(dest, { replace: true });
    },
    onError: (err: unknown) => {
      const mapped = mapAuthApiErrorToMessage(err, t);
      enqueueSnackbar(mapped ?? t('auth.errors.network'), { variant: 'error' });
    },
  });
}
