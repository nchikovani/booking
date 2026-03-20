type ApiEnvelope<TData> = {
  data?: {
    data: TData;
  };
  error?: unknown;
};

/**
 * Для типовых `{ status, data }` ответов admin API:
 * если сервер вернул ошибку — пробрасываем её в React Query,
 * иначе возвращаем полезные данные из `data`.
 */
export function getResponseDataOrThrow<TData>(response: ApiEnvelope<TData>): TData {
  if (response.error) {
    throw response.error;
  }

  return response.data!.data;
}
