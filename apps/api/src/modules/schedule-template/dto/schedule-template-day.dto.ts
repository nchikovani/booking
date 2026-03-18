import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { parseTimeToMinutes } from '../../../common/utils/time.util';
import { IsTimeMultipleOf5 } from '../../../common/validators/is-time-multiple-of-five.validator';
import { IsStartTimeBeforeEndTime } from '../../../common/validators/is-start-time-before-end-time.validator';
import { ScheduleTemplateBreakDto } from './schedule-template-break.dto';

/**
 * Валидатор: все перерывы внутри [startTime, endTime] дня и не пересекаются.
 */
function IsBreaksInsideDay(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isBreaksInsideDay',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const obj = args.object as {
            startTime?: string;
            endTime?: string;
            breaks?: Array<{ startTime: string; endTime: string }>;
          };
          const dayStart = parseTimeToMinutes(obj.startTime ?? '');
          const dayEnd = parseTimeToMinutes(obj.endTime ?? '');
          const breaks = Array.isArray(value) ? value : [];
          if (dayStart === null || dayEnd === null) return true;

          for (const b of breaks) {
            const bStart = parseTimeToMinutes(b.startTime);
            const bEnd = parseTimeToMinutes(b.endTime);
            if (bStart === null || bEnd === null) return false;
            if (bStart < dayStart || bEnd > dayEnd || bStart >= bEnd) return false;
          }

          // Проверка непересечения перерывов
          const sorted = [...breaks].sort(
            (a, b) =>
              (parseTimeToMinutes(a.startTime) ?? 0) - (parseTimeToMinutes(b.startTime) ?? 0),
          );
          for (let i = 1; i < sorted.length; i++) {
            const prevEnd = parseTimeToMinutes(sorted[i - 1].endTime);
            const currStart = parseTimeToMinutes(sorted[i].startTime);
            if (prevEnd !== null && currStart !== null && prevEnd > currStart) return false;
          }
          return true;
        },
        defaultMessage() {
          return 'breaks must be inside day range and not overlap';
        },
      },
    });
  };
}

export class ScheduleTemplateDayDto {
  @ApiProperty({ minimum: 0, maximum: 6, description: '0=вс, 1=пн, ..., 6=сб' })
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek!: number;

  @ApiProperty({ example: '09:00', description: 'Начало рабочего дня HH:mm' })
  @IsString()
  @Matches(/^\d{1,2}:\d{2}$/, { message: 'startTime must be in HH:mm format' })
  @IsTimeMultipleOf5()
  startTime!: string;

  @ApiProperty({ example: '18:00', description: 'Конец рабочего дня HH:mm' })
  @IsString()
  @Matches(/^\d{1,2}:\d{2}$/, { message: 'endTime must be in HH:mm format' })
  @IsTimeMultipleOf5()
  @IsStartTimeBeforeEndTime()
  endTime!: string;

  @ApiPropertyOptional({
    type: [ScheduleTemplateBreakDto],
    maxItems: 10,
    default: [],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleTemplateBreakDto)
  @ArrayMaxSize(10)
  @IsBreaksInsideDay()
  breaks: ScheduleTemplateBreakDto[] = [];
}
