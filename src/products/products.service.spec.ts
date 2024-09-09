import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from 'nestjs-prisma';
import { mockPrismaService } from '../__mocks__/prisma.service.mock';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProduct', () => {
    it('should call prisma.product.create with correct data', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Pupusa de Queso',
        description:
          'Un delicioso plato salvadoreño hecho de tortilla de maíz rellena de queso.',
        price: 1.5,
        stock: 50,
        images: [{ url: 'https://example.com/pupusa-queso.jpg' }],
      };

      await service.createProduct(createProductDto);

      expect(prisma.product.create).toHaveBeenCalledWith({
        data: {
          name: 'Pupusa de Queso',
          description:
            'Un delicioso plato salvadoreño hecho de tortilla de maíz rellena de queso.',
          price: 1.5,
          stock: 50,
          images: {
            create: [{ url: 'https://example.com/pupusa-queso.jpg' }],
          },
        },
      });
    });
  });

  describe('updateProduct', () => {
    it('should call prisma.product.update with correct data', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Pupusa de Chicharrón',
        description:
          'Un plato típico salvadoreño hecho con tortilla de maíz rellena de chicharrón.',
        price: 2.0,
        stock: 100,
        images: [{ url: 'https://example.com/pupusa-chicharron.jpg' }],
        isDisabled: false,
      };

      // Simulamos la respuesta del método `findUnique` con una promesa
      prisma.product.findUnique = jest.fn().mockReturnValue(
        Promise.resolve({
          id: '123',
          name: 'Pupusa de Queso',
        }),
      );

      await service.updateProduct('123', updateProductDto);

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: '123' },
        data: {
          name: 'Pupusa de Chicharrón',
          description:
            'Un plato típico salvadoreño hecho con tortilla de maíz rellena de chicharrón.',
          price: 2.0,
          stock: 100,
          isDisabled: false,
          images: {
            deleteMany: {},
            create: [{ url: 'https://example.com/pupusa-chicharron.jpg' }],
          },
        },
      });
    });

    it('should throw NotFoundException if product does not exist', async () => {
      // Simulamos que el producto no existe
      prisma.product.findUnique = jest
        .fn()
        .mockReturnValue(Promise.resolve(null));

      await expect(
        service.updateProduct('123', { name: 'Pupusa de Chicharrón' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteProduct', () => {
    it('should call prisma.product.delete with correct id', async () => {
      prisma.product.findUnique = jest
        .fn()
        .mockReturnValue(Promise.resolve({ id: '123' }));

      await service.deleteProduct('123');

      expect(prisma.product.delete).toHaveBeenCalledWith({
        where: { id: '123' },
      });
    });

    it('should throw NotFoundException if product does not exist', async () => {
      prisma.product.findUnique = jest
        .fn()
        .mockReturnValue(Promise.resolve(null));

      await expect(service.deleteProduct('123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('disableProduct', () => {
    it('should call prisma.product.update to diisable product', async () => {
      prisma.product.findUnique = jest
        .fn()
        .mockReturnValue(Promise.resolve({ id: '123' }));

      await service.disableProduct('123');

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: '123' },
        data: { isDisabled: true },
      });
    });

    it('should throw NotFoundException if product does not exist', async () => {
      prisma.product.findUnique = jest
        .fn()
        .mockReturnValue(Promise.resolve(null));

      await expect(service.disableProduct('123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('listProducts', () => {
    it('should return paginated products', async () => {
      prisma.product.findMany = jest
        .fn()
        .mockReturnValue(Promise.resolve([{ id: '123', name: 'Product 1' }]));
      prisma.product.count = jest.fn().mockReturnValue(Promise.resolve(1));

      const result = await service.listProducts(1, 10);

      expect(prisma.product.findMany).toHaveBeenCalled();
      expect(prisma.product.count).toHaveBeenCalled();
      expect(result).toEqual({
        products: [{ id: '123', name: 'Product 1' }],
        totalCount: 1,
        currentPage: 1,
        totalPages: 1,
      });
    });
  });

  describe('searchProductsByCategory', () => {
    it('should return paginated products by category', async () => {
      prisma.product.findMany = jest
        .fn()
        .mockReturnValue(Promise.resolve([{ id: '123', name: 'Product 1' }]));
      prisma.product.count = jest.fn().mockReturnValue(Promise.resolve(1));

      const result = await service.searchProductsByCategory('cat123', 1, 10);

      expect(prisma.product.findMany).toHaveBeenCalledWith(expect.anything());
      expect(result).toEqual({
        products: [{ id: '123', name: 'Product 1' }],
        totalCount: 1,
        currentPage: 1,
        totalPages: 1,
      });
    });
  });

  describe('getProductDetails', () => {
    it('should return product details', async () => {
      const product = {
        id: '123',
        name: 'Product 1',
        images: [],
        category: {},
      };
      prisma.product.findUnique = jest
        .fn()
        .mockReturnValue(Promise.resolve(product));

      const result = await service.getProductDetails('123');

      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product does not exist', async () => {
      prisma.product.findUnique = jest
        .fn()
        .mockReturnValue(Promise.resolve(null));

      await expect(service.getProductDetails('123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
