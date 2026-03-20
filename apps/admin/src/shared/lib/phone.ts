const MAX_PHONE_DIGITS = 15;

/**
 * Канонический формат для API: +<только цифры>.
 */
export function toApiPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, MAX_PHONE_DIGITS);
  return digits ? `+${digits}` : '';
}
