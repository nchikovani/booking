import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { parseTimeToMinutes } from '../utils/time.util';

/**
 * Валидатор: startTime < endTime (строго).
 * Используется в ScheduleTemplateDayDto и ScheduleTemplateBreakDto.
 */
export function IsStartTimeBeforeEndTime(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isStartTimeBeforeEndTime',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(_value: unknown, args: ValidationArguments) {
          const obj = args.object as { startTime?: string; endTime?: string };
          const start = parseTimeToMinutes(obj.startTime ?? '');
          const end = parseTimeToMinutes(obj.endTime ?? '');
          if (start === null || end === null) return true;
          return start < end;
        },
        defaultMessage() {
          return 'startTime must be strictly less than endTime';
        },
      },
    });
  };
}
