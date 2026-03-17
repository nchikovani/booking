import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ServiceResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  description?: string | null;

  @ApiProperty({ example: '1500.00' })
  price!: string;

  @ApiProperty()
  durationMinutes!: number;

  @ApiProperty()
  breakAfterMinutes!: number;

  @ApiPropertyOptional()
  categoryId?: string | null;

  @ApiPropertyOptional()
  categoryName?: string | null;

  @ApiProperty()
  position!: number;

  @ApiProperty()
  createdAt!: string;
}
