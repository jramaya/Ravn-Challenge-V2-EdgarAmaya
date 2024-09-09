import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { PasswordService } from '../auth/password.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

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
        images: [{ url: 'https://example.com/pupusa-queso.jpg' }],
        createdAt: new Date(),
        updatedAt: new Date(),
        isDisabled: false,
        createdById: '123',
      };

      jest
        .spyOn(service, 'createProduct')
        .mockImplementation(async () => createdProduct);

      const result = await controller.createProduct(createProductDto);

      expect(service.createProduct).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(createdProduct);
    });
  });
});
