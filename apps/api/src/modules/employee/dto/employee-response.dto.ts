import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmployeeResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  specialization?: string | null;

  @ApiPropertyOptional()
  imageUrl?: string | null;

  @ApiProperty({ type: [String] })
  serviceIds!: string[];

  @ApiProperty()
  createdAt!: string;

  @ApiPropertyOptional()
  updatedAt?: string;
}
