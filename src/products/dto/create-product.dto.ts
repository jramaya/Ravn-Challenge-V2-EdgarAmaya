import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ImageDto } from './image.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@InputType()
export class CreateProductDto {
  @Field()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @IsNumber()
  price: number;

  @Field()
  @IsNumber()
  stock: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @Field(() => [ImageDto], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];
}
