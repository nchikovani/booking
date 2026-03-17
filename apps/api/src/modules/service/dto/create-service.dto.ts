import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { IsMultipleOfFive } from '../../../common/validators/is-multiple-of-five.validator';

export class CreateServiceDto {
  @ApiProperty({ minLength: 1, maxLength: 200 })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional({ maxLength: 2000 })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiProperty({ minimum: 0 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ minimum: 5, maximum: 480 })
  @IsNumber()
  @Min(5)
  @Max(480)
  @IsMultipleOfFive()
  durationMinutes!: number;

  @ApiPropertyOptional({ minimum: 0, maximum: 120 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(120)
  @IsMultipleOfFive()
  breakAfterMinutes?: number;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
