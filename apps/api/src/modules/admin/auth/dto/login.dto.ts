import { IsEmail, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
    description: 'Пароль',
  })
  @IsString()
  password!: string;
}
