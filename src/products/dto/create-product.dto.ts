import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ImageDto } from './image.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@InputType()
export class CreateProductDto {
  @ApiProperty({
    example: 'Pupusa de Queso',
    description: 'El nombre del producto, por ejemplo, un plato típico salvadoreño.',
  })
  @Field()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Un delicioso plato salvadoreño hecho de tortilla de maíz rellena de queso.',
    description: 'Una breve descripción del producto.',
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 1.5,
    description: 'El precio del producto en USD.',
  })
  @Field()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 50,
    description: 'El stock disponible para el producto.',
  })
  @Field()
  @IsNumber()
  stock: number;

  @ApiPropertyOptional({
    example: 'c4d0ec42-8fbb-42ff-a234-7e2dfc49a987',
    description: 'El ID de la categoría a la que pertenece el producto (opcional).',
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({
    type: [ImageDto],
    description: 'Un array de URLs de imágenes que representan el producto (opcional).',
    example: [
      { url: 'https://example.com/pupusa-queso.jpg' },
      { url: 'https://example.com/pupusa-frijol.jpg' },
    ],
  })
  @Field(() => [ImageDto], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];
}
