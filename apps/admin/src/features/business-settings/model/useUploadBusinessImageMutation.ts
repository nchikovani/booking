import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { businessQueryKeys, uploadBusinessImage } from '@entities/business';
import { MUTATION_META_SKIP_GLOBAL_ERROR } from '@/shared/constants/react-query-meta';

export function useUploadBusinessImageMutation(businessId: string) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    meta: { [MUTATION_META_SKIP_GLOBAL_ERROR]: true },
    mutationFn: async (file: File) => {
      await uploadBusinessImage(businessId, file);
      await queryClient.invalidateQueries({ queryKey: businessQueryKeys.byId(businessId) });
    },
    onSuccess: () => {
      enqueueSnackbar(t('settings.messages.imageUploaded'), { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar(t('settings.messages.imageUploadError'), { variant: 'error' });
    },
  });
}
