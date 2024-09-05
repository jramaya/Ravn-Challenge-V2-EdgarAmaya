import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class LoginInput {
  @ApiProperty({
    description: 'email',
    example: 'user@example.com',
  })
  @Field()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password',
    example: '********',
  })
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
