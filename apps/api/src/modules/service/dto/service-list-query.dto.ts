import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

const SORT_VALUES = ['name', '-name', 'position', '-position'] as const;

export class ServiceListQueryDto {
  @ApiPropertyOptional({ description: 'Cursor для следующей страницы' })
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiPropertyOptional({ minimum: 1, maximum: 100, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({ enum: SORT_VALUES })
  @IsOptional()
  @IsIn(SORT_VALUES)
  sort?: (typeof SORT_VALUES)[number] = 'position';

  @ApiPropertyOptional({ maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  search?: string;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
