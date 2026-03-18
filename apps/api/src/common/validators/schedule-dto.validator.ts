import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

/**
 * Валидатор для schedule: ровно одно из scheduleTemplateId | days.
 * Пустой {} — 400; оба поля — 400.
 * Применять к полю schedule в CreateEmployeeDto/UpdateEmployeeDto.
 */
export function IsScheduleDtoValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isScheduleDtoValid',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          // value — поле schedule (объект, null или undefined)
          if (value === undefined) return true;
          if (value === null) return true;
          if (typeof value !== 'object' || value === null) return false;
          const obj = value as { scheduleTemplateId?: unknown; days?: unknown };
          const hasTemplate =
            obj.scheduleTemplateId !== undefined && obj.scheduleTemplateId !== null;
          const hasDays = obj.days !== undefined && Array.isArray(obj.days);
          if (hasTemplate && hasDays) return false;
          if (!hasTemplate && !hasDays) return false;
          return true;
        },
        defaultMessage() {
          return 'schedule must have exactly one of scheduleTemplateId or days; empty object or both fields are invalid';
        },
      },
    });
  };
}
