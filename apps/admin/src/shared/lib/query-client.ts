import { QueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { i18n } from '@shared/i18n';
import { MUTATION_META_SKIP_GLOBAL_ERROR } from '@shared/constants/react-query-meta';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 60 * 1000, // 3 минуты
      retry: 1,
    },
    mutations: {
      onError: (_err, _vars, _ctx, mutation) => {
        if (mutation.meta?.[MUTATION_META_SKIP_GLOBAL_ERROR]) {
          return;
        }
        enqueueSnackbar(i18n.t('common.error'), { variant: 'error' });
      },
    },
  },
});
