/** Тело ошибки API (Nest http-exception.filter). */
export type ApiErrorBody = {
  status?: string;
  error?: { code?: string; message?: string };
};

export function getApiErrorCode(error: unknown): string | undefined {
  if (error && typeof error === 'object' && 'error' in error) {
    const e = error as ApiErrorBody;
    return typeof e.error?.code === 'string' ? e.error.code : undefined;
  }
  return undefined;
}

export function getApiErrorMessage(error: unknown): string | undefined {
  if (error && typeof error === 'object' && 'error' in error) {
    const e = error as ApiErrorBody;
    return typeof e.error?.message === 'string' ? e.error.message : undefined;
  }
  return undefined;
}
