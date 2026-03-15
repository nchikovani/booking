import { IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export class ResetPasswordDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Токен из ссылки для сброса пароля',
  })
  @IsString()
  token!: string;

  @ApiProperty({
    example: 'NewSecureP@ssw0rd',
    description: 'Новый пароль: минимум 8 символов, буквы и цифры',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(PASSWORD_REGEX, { message: 'Password must contain letters and numbers' })
  password!: string;
}
