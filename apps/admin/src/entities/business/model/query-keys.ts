export const businessQueryKeys = {
  all: ['business'] as const,
  byId: (businessId: string) => [...businessQueryKeys.all, businessId] as const,
};
