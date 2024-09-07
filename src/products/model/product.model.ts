import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field()
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export class Image {
  @Field()
  id: string;

  @Field()
  url: string;

  @Field(() => String)
  productId: string;
}

@ObjectType()
export class Product {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  price: number;

  @Field()
  stock: number;

  @Field(() => Boolean, { defaultValue: false })
  isDisabled: boolean;

  @Field(() => [Image], { nullable: true }) // Updated to avoid circular reference
  images?: Image[];

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
