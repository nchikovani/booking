import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Transform, type TransformFnParams } from 'class-transformer';

function emptyStringToNull({ value }: TransformFnParams): string | null | undefined {
  if (value === '') return null;
  return value as string | undefined;
}

function toNumberOrNull({ value }: TransformFnParams): number | null | undefined {
  if (value === '' || value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
}

export class UpdateBusinessDto {
  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform(emptyStringToNull)
  name?: string;

  @ApiPropertyOptional({ maxLength: 2000 })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @Transform(emptyStringToNull)
  description?: string;

  @ApiPropertyOptional({ maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Transform(emptyStringToNull)
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  @Transform(emptyStringToNull)
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @Transform(emptyStringToNull)
  website?: string;

  @ApiPropertyOptional({ maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Transform(emptyStringToNull)
  telegram?: string;

  @ApiPropertyOptional({ maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Transform(emptyStringToNull)
  vk?: string;

  @ApiPropertyOptional({ maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Transform(emptyStringToNull)
  youtube?: string;

  @ApiPropertyOptional({ maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  @Transform(emptyStringToNull)
  address?: string;

  @ApiPropertyOptional({ minimum: -90, maximum: 90 })
  @IsOptional()
  @Transform(toNumberOrNull)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiPropertyOptional({ minimum: -180, maximum: 180 })
  @IsOptional()
  @Transform(toNumberOrNull)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;
}
