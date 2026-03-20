/**
 * Ключ meta мутаций TanStack Query: не вызывать глобальный snackbar в `QueryClient`,
 * если ошибку уже обработали в форме / в `onError` мутации.
 */
export const MUTATION_META_SKIP_GLOBAL_ERROR = 'skipGlobalMutationError' as const;

export type GlobalErrorMutationMeta = {
  [MUTATION_META_SKIP_GLOBAL_ERROR]?: boolean;
};
