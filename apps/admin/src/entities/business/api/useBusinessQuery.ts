import { useQuery } from '@tanstack/react-query';
import { getBusinessById } from './business';
import { businessQueryKeys } from '../model/query-keys';

export function useBusinessQuery(businessId: string | null) {
  return useQuery({
    queryKey: businessId ? businessQueryKeys.byId(businessId) : businessQueryKeys.all,
    queryFn: () => getBusinessById(businessId as string),
    enabled: Boolean(businessId),
  });
}
