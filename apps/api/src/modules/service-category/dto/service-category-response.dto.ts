import { ApiProperty } from '@nestjs/swagger';

export class ServiceCategoryResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  createdAt!: string;
}
