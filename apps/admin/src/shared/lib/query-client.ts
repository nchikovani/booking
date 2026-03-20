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
      onError: (err, _vars, _ctx, mutation) => {
        if (mutation.meta?.[MUTATION_META_SKIP_GLOBAL_ERROR]) {
          return;
        }
        let errorMessage = i18n.t('common.error');

        if (err && typeof err === 'object' && 'error' in err) {
          const apiError = err.error;

          if (
            apiError &&
            typeof apiError === 'object' &&
            'message' in apiError &&
            typeof apiError.message === 'string'
          ) {
            errorMessage = apiError.message;
          }
        }
        enqueueSnackbar(errorMessage, { variant: 'error' });
      },
    },
  },
});
