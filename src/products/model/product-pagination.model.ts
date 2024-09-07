import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from './product.model';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class ProductPagination {
  @Field(() => [Product])
  @ApiProperty({ type: [Product], description: 'List of products' })
  products: Product[];

  @Field()
  @ApiProperty({ example: 100, description: 'Total number of products' })
  totalCount: number;

  @Field()
  @ApiProperty({ example: 1, description: 'Current page' })
  currentPage: number;

  @Field()
  @ApiProperty({ example: 10, description: 'Total number of pages' })
  totalPages: number;
}
