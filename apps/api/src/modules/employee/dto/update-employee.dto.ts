import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, type TransformFnParams } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ServiceLinkDto } from './service-link.dto';
import { ScheduleDto } from '../../employee-schedule/dto/schedule.dto';
import { IsScheduleDtoValid } from '../../../common/validators/schedule-dto.validator';

function emptyStringToNull({ value }: TransformFnParams): string | null | undefined {
  if (value === '') return null;
  return value as string | undefined;
}

export class UpdateEmployeeDto {
  @ApiPropertyOptional({ minLength: 1, maxLength: 200 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name?: string;

  @ApiPropertyOptional({ maxLength: 200, nullable: true })
  @IsOptional()
  @Transform(emptyStringToNull)
  @IsString()
  @MaxLength(200)
  specialization?: string | null;

  @ApiPropertyOptional({ type: [ServiceLinkDto], maxItems: 500 })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceLinkDto)
  @ArrayMaxSize(500)
  services?: ServiceLinkDto[];

  @ApiPropertyOptional({ type: ScheduleDto, nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => ScheduleDto)
  @IsScheduleDtoValid()
  schedule?: ScheduleDto | null;
}
