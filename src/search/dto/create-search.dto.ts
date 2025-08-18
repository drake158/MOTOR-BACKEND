import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsString, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class CreateSearchDto {
  @ApiProperty({ enum: ['images', 'phrases', 'videos'] })
  @IsIn(['images', 'phrases', 'videos'])
  type!: 'images' | 'phrases' | 'videos';

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  tokens!: string[];
}
