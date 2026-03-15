import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID пользователя' })
  id!: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email', nullable: true })
  email!: string | null;

  @ApiProperty({ example: 'Иван', description: 'Имя', nullable: true })
  firstName!: string | null;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия', nullable: true })
  lastName!: string | null;
}

export class AuthResponseDto {
  @ApiProperty({ type: AuthUserDto, description: 'Данные пользователя' })
  user!: AuthUserDto;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  accessToken!: string;

  @ApiProperty({
    example: 900,
    description: 'Время жизни access token в секундах',
  })
  expiresIn!: number;
}

export class MessageResponseDto {
  @ApiProperty({
    example: 'Пароль успешно изменён',
    description: 'Сообщение о результате операции',
  })
  message!: string;
}
