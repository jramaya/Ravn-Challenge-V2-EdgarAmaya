import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ImageDto } from './image.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@InputType()
export class UpdateProductDto {
  @ApiPropertyOptional({
    example: 'Pupusa de Chicharrón',
    description: 'El nombre actualizado del producto, por ejemplo, un plato típico salvadoreño.',
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Un plato típico salvadoreño hecho con tortilla de maíz rellena de chicharrón.',
    description: 'Una descripción actualizada del producto.',
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 2.0,
    description: 'El precio actualizado del producto en USD.',
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    example: 100,
    description: 'El stock actualizado para el producto.',
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  stock?: number;

  @ApiPropertyOptional({
    type: [ImageDto],
    description: 'Un array actualizado de URLs de imágenes del producto (opcional).',
    example: [
      { url: 'https://example.com/pupusa-chicharron.jpg' },
      { url: 'https://example.com/pupusa-mixta.jpg' },
    ],
  })
  @Field(() => [ImageDto], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si el producto está deshabilitado (opcional).',
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isDisabled?: boolean;
}
