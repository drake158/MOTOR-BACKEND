import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class InspirationQueryDto {
  @ApiProperty({ enum: ['images', 'phrases', 'videos'] })
  @IsIn(['images', 'phrases', 'videos'])
  type!: 'images' | 'phrases' | 'videos';

  // tokens en CSV: "a,b,c"
  @ApiProperty({ required: false, description: 'Lista CSV de tokens: a,b,c' })
  @IsOptional()
  @IsString()
  tokens?: string;
}
