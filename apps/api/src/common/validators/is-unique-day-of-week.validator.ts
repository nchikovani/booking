import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * Валидатор: dayOfWeek уникален в массиве дней (объекты с полем dayOfWeek 0–6).
 */
export function IsUniqueDayOfWeek(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUniqueDayOfWeek',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (!Array.isArray(value)) return true;
          const days = new Set<number>();
          for (const d of value) {
            const day = (d as { dayOfWeek?: number }).dayOfWeek;
            if (typeof day === 'number' && (day < 0 || day > 6)) continue;
            if (typeof day === 'number') {
              if (days.has(day)) return false;
              days.add(day);
            }
          }
          return true;
        },
        defaultMessage() {
          return 'dayOfWeek must be unique in days array';
        },
      },
    });
  };
}
