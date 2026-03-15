import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BusinessListItemDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiPropertyOptional({ example: 'Салон красоты «Элегант»' })
  name!: string | null;

  @ApiPropertyOptional({ example: 'Салон красоты в центре города' })
  description!: string | null;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/businesses/xxx/logo.webp' })
  logoUrl!: string | null;

  @ApiProperty({ example: 'OWNER', enum: ['OWNER'] })
  role!: string;
}
