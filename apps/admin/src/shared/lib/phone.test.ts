import { describe, expect, it } from 'vitest';
import { toApiPhone } from './phone';

describe('phone', () => {
  it('конвертирует номер в API-формат', () => {
    expect(toApiPhone('+7 (999) 123-45-67')).toBe('+79991234567');
    expect(toApiPhone('+44 20 7123 4567')).toBe('+442071234567');
    expect(toApiPhone('')).toBe('');
  });

  it('обрезает номер до 15 цифр по E.164', () => {
    expect(toApiPhone('+1234567890123456789')).toBe('+123456789012345');
  });
});
