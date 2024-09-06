import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCategoryDto } from './dto/create-category';
import { UpdateCategoryDto } from './dto/update-category';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: {
          name: createCategoryDto.name,
        },
      });
      return category;
    } catch (error) {
      throw new Error('Error creating category');
    }
  }

  async findAll() {
    try {
      const categories = await this.prisma.category.findMany();
      return categories;
    } catch (error) {
      throw new Error('Error retrieving categories');
    }
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    try {
      const updatedCategory = await this.prisma.category.update({
        where: { id },
        data: {
          name: updateCategoryDto.name ?? category.name,
        },
      });
      return updatedCategory;
    } catch (error) {
      throw new Error('Error updating category');
    }
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    try {
      await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Error deleting category');
    }
  }
}
