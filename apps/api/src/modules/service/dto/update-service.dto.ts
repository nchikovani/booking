import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, type TransformFnParams } from 'class-transformer';
import { IsMultipleOfFive } from '../../../common/validators/is-multiple-of-five.validator';
import { EmployeeServiceLinkDto } from './employee-service-link.dto';

function emptyStringToNull({ value }: TransformFnParams): string | null | undefined {
  if (value === '') return null;
  return value as string | undefined;
}

export class UpdateServiceDto {
  @ApiPropertyOptional({ minLength: 1, maxLength: 200 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name?: string;

  @ApiPropertyOptional({ maxLength: 2000 })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ minimum: 5, maximum: 480 })
  @IsOptional()
  @IsNumber()
  @Min(5)
  @Max(480)
  @IsMultipleOfFive()
  durationMinutes?: number;

  @ApiPropertyOptional({ minimum: 0, maximum: 120 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(120)
  @IsMultipleOfFive()
  breakAfterMinutes?: number;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  @IsOptional()
  @Transform(emptyStringToNull)
  @IsUUID()
  categoryId?: string | null;

  @ApiPropertyOptional({ type: [EmployeeServiceLinkDto], maxItems: 500 })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmployeeServiceLinkDto)
  @ArrayMaxSize(500)
  employeeServices?: EmployeeServiceLinkDto[];
}
