import { getApiErrorCode } from '@shared/lib/api-error';

/** Сообщение формы по телу ошибки API или null (тогда — generic на месте вызова). */
export function mapAuthApiErrorToMessage(error: unknown, t: (k: string) => string): string | null {
  const code = getApiErrorCode(error);
  if (!code) {
    return null;
  }
  const key = `auth.errors.codes.${code}`;
  const msg = t(key);
  return msg === key ? null : msg;
}
