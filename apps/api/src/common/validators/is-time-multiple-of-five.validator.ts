import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { validateTimeMultipleOf5 } from '../utils/time.util';

/**
 * Валидатор: строка времени в формате HH:mm должна быть кратна 5 минутам.
 * Допустимы "9:00", "09:00" и т.п.
 */
export function IsTimeMultipleOf5(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isTimeMultipleOf5',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return typeof value === 'string' && validateTimeMultipleOf5(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be in HH:mm format and a multiple of 5 minutes`;
        },
      },
    });
  };
}
