/**
 * Утилиты для работы со временем в формате HH:mm.
 * Минуты от полуночи: 0–1439. Время кратно 5 минутам.
 */

const TIME_REGEX = /^\d{1,2}:\d{2}$/;

/**
 * Парсит строку HH:mm в минуты от полуночи (0–1439).
 * Допустимы форматы "9:00" и "09:00".
 * @returns минуты от полуночи или null при невалидном формате/значениях
 */
export function parseTimeToMinutes(time: string): number | null {
  if (typeof time !== 'string' || !TIME_REGEX.test(time.trim())) {
    return null;
  }
  const parts = time.trim().split(':').map(Number);
  const h = parts[0];
  const m = parts[1];
  if (
    h === undefined ||
    m === undefined ||
    h < 0 ||
    h > 23 ||
    m < 0 ||
    m > 59 ||
    !Number.isInteger(h) ||
    !Number.isInteger(m)
  ) {
    return null;
  }
  const minutes = h * 60 + m;
  return minutes <= 1439 ? minutes : null;
}

/**
 * Форматирует минуты от полуночи в строку HH:mm.
 */
export function formatMinutesToTime(minutes: number): string {
  if (!Number.isInteger(minutes) || minutes < 0 || minutes > 1439) {
    throw new RangeError('minutes must be 0–1439');
  }
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

/**
 * Проверяет, что время в формате HH:mm и кратно 5 минутам.
 */
export function validateTimeMultipleOf5(time: string): boolean {
  const minutes = parseTimeToMinutes(time);
  return minutes !== null && minutes % 5 === 0;
}
