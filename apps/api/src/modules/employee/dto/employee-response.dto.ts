import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ServiceLinkResponseDto {
  @ApiProperty()
  serviceId!: string;

  @ApiPropertyOptional()
  priceOverride?: string | null;

  @ApiPropertyOptional()
  durationMinutesOverride?: number | null;
}

export class EmployeeResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  specialization?: string | null;

  @ApiPropertyOptional()
  imageUrl?: string | null;

  @ApiProperty({ type: [ServiceLinkResponseDto] })
  services!: ServiceLinkResponseDto[];

  @ApiProperty()
  createdAt!: string;

  @ApiPropertyOptional()
  updatedAt?: string;
}
