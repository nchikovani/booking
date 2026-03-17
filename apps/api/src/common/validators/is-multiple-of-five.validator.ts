import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

/**
 * Валидатор: значение должно быть кратно 5.
 * Используется для полей, влияющих на время (durationMinutes, breakAfterMinutes и т.п.).
 */
export function IsMultipleOfFive(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isMultipleOfFive',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return typeof value === 'number' && Number.isInteger(value) && value % 5 === 0;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a multiple of 5`;
        },
      },
    });
  };
}
