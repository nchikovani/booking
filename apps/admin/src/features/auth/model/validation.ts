/** Валидация паролей для auth-форм (Feature 1.1: 8+, буквы и цифры). */

export function validateAuthPassword(value: string): string | null {
  if (!value) {
    return 'required';
  }
  if (value.length < 8) {
    return 'minLength';
  }
  if (!/[a-zA-Zа-яА-ЯёЁ]/.test(value) || !/\d/.test(value)) {
    return 'lettersAndDigits';
  }
  return null;
}

export function validateAuthPasswordConfirm(password: string, confirm: string): string | null {
  if (!confirm) {
    return 'required';
  }
  if (password !== confirm) {
    return 'mismatch';
  }
  return null;
}
