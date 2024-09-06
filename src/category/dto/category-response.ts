import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the category',
    example: 'cuid1234',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the category',
    example: 'PupusasRevueltas',
  })
  name: string;
}
