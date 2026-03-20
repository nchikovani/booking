import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { businessQueryKeys, updateBusinessById } from '@entities/business';
import { mapBusinessToFormValues, mapFormValuesToUpdateBusinessDto } from './mappers';
import type { BusinessFormValues } from './types';

type Params = {
  businessId: string;
  onSaved?: (values: BusinessFormValues) => void;
};

export function useSaveBusinessMutation({ businessId, onSaved }: Params) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formValues: BusinessFormValues) =>
      updateBusinessById(businessId, mapFormValuesToUpdateBusinessDto(formValues)),
    onSuccess: (updatedBusiness) => {
      queryClient.setQueryData(businessQueryKeys.byId(businessId), updatedBusiness);
      onSaved?.(mapBusinessToFormValues(updatedBusiness));
      enqueueSnackbar(t('settings.messages.saved'), { variant: 'success' });
    },
  });
}
