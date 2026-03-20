/** Базовая проверка URL сайта для любых форм (FSD: shared). */

const WEBSITE_MAX = 2048;
const websiteRe = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

/**
 * Поле сайта в бизнес-настройках опциональное:
 * пустое значение валидным и не требует подсветки ошибки.
 */
export function validateWebsite(value: string): string | null {
  const v = value.trim();
  if (!v) {
    return null;
  }
  if (v.length > WEBSITE_MAX) {
    return 'maxLength';
  }
  if (!websiteRe.test(v)) {
    return 'format';
  }
  return null;
}
