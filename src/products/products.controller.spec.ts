import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { PasswordService } from '../auth/password.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        Reflector,
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: PasswordService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(JwtGuard)
      .useValue({})
      .compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should call ProductsService.createProduct with correct data', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Pupusa de Queso',
        description:
          'Un delicioso plato salvadoreño hecho de tortilla de maíz rellena de queso.',
        price: 1.5,
        stock: 50,
        images: [{ url: 'https://example.com/pupusa-queso.jpg' }],
      };

      const createdProduct = {
        id: '123',
        name: 'Pupusa de Queso',
        description:
          'Un delicioso plato salvadoreño hecho de tortilla de maíz rellena de queso.',
        price: 1.5,
        stock: 50,
        categoryId: 'c4d0ec42-8fbb-42ff-a234-7e2dfc49a987',
        images: [
          {
            id: 'img123',
            url: 'https://example.com/pupusa-queso.jpg',
            productId: '123',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        isDisabled: false,
        createdById: '123',
        category: { id: 'cat123', name: 'Typical Food' },
      };

      jest
        .spyOn(service, 'createProduct')
        .mockImplementation(async () => createdProduct);

      const result = await controller.createProduct(createProductDto);

      expect(service.createProduct).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(createdProduct);
    });
  });

  describe('getProduct', () => {
    it('should call ProductsService.getProductDetails with correct id and return product details', async () => {
      const product = {
        id: '123',
        name: 'Pupusa de Queso',
        description:
          'Un delicioso plato salvadoreño hecho de tortilla de maíz rellena de queso.',
        price: 1.5,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDisabled: false,
        categoryId: 'nnn',
        createdById: '123',
        category: { id: 'cat123', name: 'Typical Food' },
        images: [
          {
            id: 'img123',
            url: 'https://example.com/pupusa-queso.jpg',
            productId: '123',
          },
        ],
      };

      jest
        .spyOn(service, 'getProductDetails')
        .mockImplementation(async () => product);

      const result = await controller.getProduct('123');

      expect(service.getProductDetails).toHaveBeenCalledWith('123');
      expect(result).toEqual(product);
    });
  });

  describe('updateProduct', () => {
    it('should call ProductsService.updateProduct with correct id and data', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Pupusa de Chicharrón',
        description:
          'Un plato típico salvadoreño hecho con tortilla de maíz rellena de chicharrón.',
        price: 2.0,
        stock: 100,
        isDisabled: false,
        images: [{ url: 'https://example.com/pupusa-chicharron.jpg' }],
      };

      const updatedProduct = {
        id: '123',
        name: 'Pupusa de Chicharrón',
        description:
          'Un plato típico salvadoreño hecho con tortilla de maíz rellena de chicharrón.',
        price: 2.0,
        stock: 100,
        categoryId: 'c4d0ec42-8fbb-42ff-a234-7e2dfc49a987',
        images: [
          {
            id: 'img124',
            url: 'https://example.com/pupusa-chicharron.jpg',
            productId: '123',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        isDisabled: false,
        createdById: '123',
        category: { id: 'cat123', name: 'Typical Food' },
      };

      jest
        .spyOn(service, 'updateProduct')
        .mockImplementation(async () => updatedProduct);

      const result = await controller.updateProduct('123', updateProductDto);

      expect(service.updateProduct).toHaveBeenCalledWith(
        '123',
        updateProductDto,
      );
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should call ProductsService.deleteProduct with correct id', async () => {
      const deletedProduct = {
        id: '123',
        name: 'Pupusa de Queso',
        description:
          'Un delicioso plato salvadoreño hecho de tortilla de maíz rellena de queso.',
        price: 1.5,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDisabled: false,
        createdById: '123',
        categoryId: 'c4d0ec42-8fbb-42ff-a234-7e2dfc49a987',
        category: { id: 'cat123', name: 'Typical Food' },
        images: [
          {
            id: 'img123',
            url: 'https://example.com/pupusa-queso.jpg',
            productId: '123',
          },
        ],
      };

      jest
        .spyOn(service, 'deleteProduct')
        .mockImplementation(async () => deletedProduct);

      const result = await controller.deleteProduct('123');

      expect(service.deleteProduct).toHaveBeenCalledWith('123');
      expect(result).toEqual(deletedProduct);
    });
  });

  describe('disableProduct', () => {
    it('should call ProductsService.disableProduct with correct id', async () => {
      const disabledProduct = {
        id: '123',
        name: 'Pupusa de Queso',
        description:
          'Un delicioso plato salvadoreño hecho de tortilla de maíz rellena de queso.',
        price: 1.5,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDisabled: true,
        createdById: '123',
        categoryId: 'cat1',
        category: { id: 'cat123', name: 'Typical Food' },
        images: [
          {
            id: 'img123',
            url: 'https://example.com/pupusa-queso.jpg',
            productId: '123',
          },
        ],
      };

      jest
        .spyOn(service, 'disableProduct')
        .mockImplementation(async () => disabledProduct);

      const result = await controller.disableProduct('123');

      expect(service.disableProduct).toHaveBeenCalledWith('123');
      expect(result).toEqual(disabledProduct);
    });
  });
});
