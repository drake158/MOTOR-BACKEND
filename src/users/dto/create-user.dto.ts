import { IsEmail, IsOptional, isString, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  surname?: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 6 })
  @MinLength(6)
  password!: string;
}
