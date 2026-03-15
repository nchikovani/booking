import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email адрес',
    maxLength: 254,
  })
  @IsEmail()
  @MaxLength(254)
  @Transform(({ value }) => value?.trim().toLowerCase())
  email!: string;

  @ApiProperty({
    example: 'SecureP@ssw0rd',
    description: 'Пароль: минимум 8 символов, буквы и цифры',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(PASSWORD_REGEX, { message: 'Password must contain letters and numbers' })
  password!: string;

  @ApiPropertyOptional({
    example: 'Иван',
    description: 'Имя',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Иванов',
    description: 'Фамилия',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  lastName?: string;
}
