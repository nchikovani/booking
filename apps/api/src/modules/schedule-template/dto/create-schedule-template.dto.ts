import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsUniqueDayOfWeek } from '../../../common/validators/is-unique-day-of-week.validator';
import { ScheduleTemplateDayDto } from './schedule-template-day.dto';

export class CreateScheduleTemplateDto {
  @ApiProperty({ minLength: 1, maxLength: 200 })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name!: string;

  @ApiProperty({ type: [ScheduleTemplateDayDto], minItems: 1, maxItems: 7 })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @ValidateNested({ each: true })
  @Type(() => ScheduleTemplateDayDto)
  @IsUniqueDayOfWeek()
  days!: ScheduleTemplateDayDto[];
}
