import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsUniqueDayOfWeek } from '../../../common/validators/is-unique-day-of-week.validator';
import { ScheduleTemplateDayDto } from './schedule-template-day.dto';

export class UpdateScheduleTemplateDto {
  @ApiPropertyOptional({ minLength: 1, maxLength: 200 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name?: string;

  @ApiPropertyOptional({ type: [ScheduleTemplateDayDto], minItems: 1, maxItems: 7 })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @ValidateNested({ each: true })
  @Type(() => ScheduleTemplateDayDto)
  @IsUniqueDayOfWeek()
  days?: ScheduleTemplateDayDto[];
}
