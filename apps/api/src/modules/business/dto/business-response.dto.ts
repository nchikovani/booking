import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BusinessResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiPropertyOptional({ example: 'Салон красоты «Элегант»' })
  name!: string | null;

  @ApiPropertyOptional({ example: 'Салон красоты в центре города' })
  description!: string | null;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/businesses/xxx/logo.webp' })
  logoUrl!: string | null;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/businesses/xxx/image.webp' })
  imageUrl!: string | null;

  @ApiPropertyOptional({ example: '+7 999 123-45-67' })
  phone!: string | null;

  @ApiPropertyOptional({ example: 'info@elegant.ru' })
  email!: string | null;

  @ApiPropertyOptional({ example: 'https://elegant.ru' })
  website!: string | null;

  @ApiPropertyOptional({ example: '@elegant_salon' })
  telegram!: string | null;

  @ApiPropertyOptional()
  vk!: string | null;

  @ApiPropertyOptional({ example: 'https://youtube.com/@elegant_salon' })
  youtube!: string | null;

  @ApiPropertyOptional({ example: 'г. Москва, ул. Примерная, д. 1' })
  address!: string | null;

  @ApiPropertyOptional({ example: 55.75 })
  latitude!: number | null;

  @ApiPropertyOptional({ example: 37.62 })
  longitude!: number | null;

  @ApiProperty({ example: '2024-01-15T10:00:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '2024-01-15T10:00:00.000Z' })
  updatedAt!: string;
}
