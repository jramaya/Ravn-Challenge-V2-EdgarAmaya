import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: CreateProductDto) {
    const { images, ...rest } = data;

    // Transform ImageDto[] to Prisma-compatible format
    const createImages = images
      ? {
          create: images.map((image) => ({
            url: image.url,
          })),
        }
      : undefined;

    return this.prisma.product.create({
      data: {
        ...rest,
        images: createImages, // Prisma's format for nested image creation
      },
    });
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    const { images, ...rest } = data;

    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Transform ImageDto[] for updates (Prisma handles nested updates differently)
    const updateImages = images
      ? {
          deleteMany: {}, // Clear existing images
          create: images.map((image) => ({
            url: image.url,
          })),
        }
      : undefined;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...rest,
        images: updateImages, // Prisma format for updating nested images
      },
    });
  }

  async deleteProduct(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }

  async disableProduct(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        isDisabled: true,
      },
    });
  }

  async listProducts() {
    return this.prisma.product.findMany({
      where: { isDisabled: false },
      include: { category: true, images: true }, // Include related models
    });
  }

  async getProductDetails(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true, images: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
