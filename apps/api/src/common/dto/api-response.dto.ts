import { ApiProperty } from '@nestjs/swagger';

export class ApiSuccessResponseDto<T = unknown> {
  @ApiProperty({ example: 'success', enum: ['success'] })
  status!: 'success';

  @ApiProperty({ description: 'Response data' })
  data!: T;
}

export class ApiErrorDto {
  @ApiProperty({ example: 'NOT_FOUND', description: 'Error code' })
  code!: string;

  @ApiProperty({ example: 'Resource not found', description: 'Human readable message' })
  message!: string;
}

export class ApiErrorResponseDto {
  @ApiProperty({ example: 'error', enum: ['error'] })
  status!: 'error';

  @ApiProperty({ type: ApiErrorDto })
  error!: ApiErrorDto;
}
