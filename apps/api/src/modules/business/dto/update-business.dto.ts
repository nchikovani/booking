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
  name?: string | null;

  @ApiPropertyOptional({ maxLength: 2000 })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @Transform(emptyStringToNull)
  description?: string | null;

  @ApiPropertyOptional({ maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Transform(emptyStringToNull)
  phone?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  @Transform(emptyStringToNull)
  email?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @Transform(emptyStringToNull)
  website?: string | null;

  @ApiPropertyOptional({ maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Transform(emptyStringToNull)
  telegram?: string | null;

  @ApiPropertyOptional({ maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Transform(emptyStringToNull)
  vk?: string | null;

  @ApiPropertyOptional({ maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Transform(emptyStringToNull)
  youtube?: string | null;

  @ApiPropertyOptional({ maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  @Transform(emptyStringToNull)
  address?: string | null;

  @ApiPropertyOptional({ minimum: -90, maximum: 90 })
  @IsOptional()
  @Transform(toNumberOrNull)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number | null;

  @ApiPropertyOptional({ minimum: -180, maximum: 180 })
  @IsOptional()
  @Transform(toNumberOrNull)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number | null;
}
