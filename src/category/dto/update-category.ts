import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional({
    description: 'The updated name of the category',
    example: 'Pupusas',
  })
  name?: string;
}
