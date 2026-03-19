import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ScheduleTemplateDayDto } from '../../schedule-template/dto/schedule-template-day.dto';

export class ScheduleDto {
  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  scheduleTemplateId?: string;

  @ApiPropertyOptional({ type: [ScheduleTemplateDayDto], maxItems: 7 })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(7)
  @ValidateNested({ each: true })
  @Type(() => ScheduleTemplateDayDto)
  days?: ScheduleTemplateDayDto[];
}
