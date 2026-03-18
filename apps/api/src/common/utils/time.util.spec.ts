import { parseTimeToMinutes, formatMinutesToTime, validateTimeMultipleOf5 } from './time.util';

describe('time.util', () => {
  describe('parseTimeToMinutes', () => {
    it('должен парсить "09:00" в 540 минут', () => {
      expect(parseTimeToMinutes('09:00')).toBe(540);
    });

    it('должен парсить "9:00" в 540 минут', () => {
      expect(parseTimeToMinutes('9:00')).toBe(540);
    });

    it('должен парсить "00:00" в 0', () => {
      expect(parseTimeToMinutes('00:00')).toBe(0);
    });

    it('должен парсить "23:59" в 1439', () => {
      expect(parseTimeToMinutes('23:59')).toBe(1439);
    });

    it('должен парсить "17:30" в 1050', () => {
      expect(parseTimeToMinutes('17:30')).toBe(1050);
    });

    it('должен парсить "09:07" в 547 минут (валидный формат)', () => {
      expect(parseTimeToMinutes('09:07')).toBe(547);
    });

    it('должен возвращать null для "25:00" (часы вне диапазона)', () => {
      expect(parseTimeToMinutes('25:00')).toBe(null);
    });

    it('должен возвращать null для "09:60" (минуты вне диапазона)', () => {
      expect(parseTimeToMinutes('09:60')).toBe(null);
    });

    it('должен возвращать null для пустой строки', () => {
      expect(parseTimeToMinutes('')).toBe(null);
    });

    it('должен возвращать null для "abc"', () => {
      expect(parseTimeToMinutes('abc')).toBe(null);
    });

    it('должен возвращать null для "9:0" (не хватает цифры в минутах)', () => {
      expect(parseTimeToMinutes('9:0')).toBe(null);
    });
  });

  describe('formatMinutesToTime', () => {
    it('должен форматировать 540 в "09:00"', () => {
      expect(formatMinutesToTime(540)).toBe('09:00');
    });

    it('должен форматировать 0 в "00:00"', () => {
      expect(formatMinutesToTime(0)).toBe('00:00');
    });

    it('должен форматировать 1439 в "23:59"', () => {
      expect(formatMinutesToTime(1439)).toBe('23:59');
    });

    it('должен форматировать 1050 в "17:30"', () => {
      expect(formatMinutesToTime(1050)).toBe('17:30');
    });

    it('должен выбрасывать RangeError для минут < 0', () => {
      expect(() => formatMinutesToTime(-1)).toThrow(RangeError);
    });

    it('должен выбрасывать RangeError для минут > 1439', () => {
      expect(() => formatMinutesToTime(1440)).toThrow(RangeError);
    });
  });

  describe('validateTimeMultipleOf5', () => {
    it('должен возвращать true для "09:00"', () => {
      expect(validateTimeMultipleOf5('09:00')).toBe(true);
    });

    it('должен возвращать true для "17:30"', () => {
      expect(validateTimeMultipleOf5('17:30')).toBe(true);
    });

    it('должен возвращать true для "00:00"', () => {
      expect(validateTimeMultipleOf5('00:00')).toBe(true);
    });

    it('должен возвращать false для "09:07" (не кратно 5)', () => {
      expect(validateTimeMultipleOf5('09:07')).toBe(false);
    });

    it('должен возвращать false для "09:01"', () => {
      expect(validateTimeMultipleOf5('09:01')).toBe(false);
    });

    it('должен возвращать false для невалидного формата', () => {
      expect(validateTimeMultipleOf5('abc')).toBe(false);
      expect(validateTimeMultipleOf5('')).toBe(false);
    });
  });
});
