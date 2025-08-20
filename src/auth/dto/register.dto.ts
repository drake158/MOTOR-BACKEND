import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, Min, MinLength } from 'class-validator';

export class RegisterDto {
    @Transform(({ value }) => value.trim())
    @ApiProperty()
    @IsString()
    @MinLength(1)
    name!: string;

    @Transform(({ value }) => value.trim())
    @ApiProperty({ required: false })
    @IsString()
    @MinLength(1)
    surname!: string;

    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty({ minLength: 6 })
    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    password!: string;
}
