import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'name_email@mail.ru',
    description: 'Электронная почта',
  })
  @IsString({ message: 'Почта должна быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '1234567', description: 'Пароль' })
  @IsString({ message: 'Должен быть строкой' })
  @Length(3, 5, {
    message: 'Пароль должен быть минимум 3 символа и максимум 5',
  })
  readonly password: string;
}
