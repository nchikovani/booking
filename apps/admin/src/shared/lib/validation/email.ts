/** Базовая проверка email для любых форм (FSD: shared). */

const EMAIL_MAX = 254;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string): string | null {
  const v = value.trim();
  if (!v) {
    return 'required';
  }
  if (v.length > EMAIL_MAX) {
    return 'maxLength';
  }
  if (!emailRe.test(v)) {
    return 'format';
  }
  return null;
}
