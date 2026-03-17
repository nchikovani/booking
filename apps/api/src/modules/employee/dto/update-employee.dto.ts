import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

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

  @ApiPropertyOptional({ type: [String], format: 'uuid', maxItems: 500 })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMaxSize(500)
  serviceIds?: string[];
}
