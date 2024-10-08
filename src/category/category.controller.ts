import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category';
import { UpdateCategoryDto } from './dto/update-category';
import { CategoryResponseDto } from './dto/category-response';
import { OnlyManager } from '../common/decorators/only-manager.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Public } from '../common/decorators/is-public.decorator';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @OnlyManager()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryService.create(createCategoryDto);
    return { id: category.id, name: category.name };
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully',
  })
  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryService.findAll();
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
    }));
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a category by id' })
  @ApiResponse({ status: 200, description: 'Category retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(@Param('id') id: string): Promise<CategoryResponseDto> {
    const category = await this.categoryService.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return { id: category.id, name: category.name };
  }

  @Patch(':id')
  @OnlyManager()
  @ApiOperation({ summary: 'Update a category by id' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryService.update(id, updateCategoryDto);
    return { id: category.id, name: category.name };
  }

  @Delete(':id')
  @OnlyManager()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a category by id' })
  @ApiResponse({ status: 204, description: 'Category deleted successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoryService.remove(id);
  }
}
