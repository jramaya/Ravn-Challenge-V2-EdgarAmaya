import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class SignupInput {
  @Field()
  @ApiProperty({
    example: 'test@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
    required: false,
  })
  @IsString()
  firstname?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
    required: false,
  })
  @IsString()
  lastname?: string;

  @ApiProperty({
    example: 'CLIENT',
    enum: Role,
    description: 'The role of the user',
    default: Role.CLIENT,
  })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
