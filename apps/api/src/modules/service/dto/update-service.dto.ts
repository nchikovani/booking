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
} from 'class-validator';
import { Transform, type TransformFnParams } from 'class-transformer';
import { IsMultipleOfFive } from '../../../common/validators/is-multiple-of-five.validator';

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

  @ApiPropertyOptional({ type: [String], format: 'uuid', maxItems: 500 })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMaxSize(500)
  employeeIds?: string[];
}
