import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ImageDto {
  @Field()
  @IsString()
  url: string;
}
