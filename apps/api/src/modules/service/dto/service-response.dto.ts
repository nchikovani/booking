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

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        employeeId: { type: 'string' },
        priceOverride: { type: 'string', nullable: true },
        durationMinutesOverride: { type: 'number', nullable: true },
      },
    },
    description: 'Связи с сотрудниками (с опциональной индивидуальной ценой и длительностью)',
  })
  employeeServices!: {
    employeeId: string;
    priceOverride?: string | null;
    durationMinutesOverride?: number | null;
  }[];

  @ApiProperty()
  createdAt!: string;
}
