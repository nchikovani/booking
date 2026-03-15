import { IsEmail, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email адрес для отправки ссылки сброса пароля',
    maxLength: 254,
  })
  @IsEmail()
  @MaxLength(254)
  @Transform(({ value }) => value?.trim().toLowerCase())
  email!: string;
}
