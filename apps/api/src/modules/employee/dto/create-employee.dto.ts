import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ServiceLinkDto } from './service-link.dto';
import { ScheduleDto } from '../../employee-schedule/dto/schedule.dto';
import { IsScheduleDtoValid } from '../../../common/validators/schedule-dto.validator';

export class CreateEmployeeDto {
  @ApiProperty({ minLength: 1, maxLength: 200 })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional({ maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  specialization?: string;

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
