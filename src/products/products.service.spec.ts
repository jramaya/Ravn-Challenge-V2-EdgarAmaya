import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from 'nestjs-prisma';
import { mockPrismaService } from '../__mocks__/prisma.service.mock';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

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
      expect(mockPrismaService.product.create).toHaveBeenCalledWith({
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
});
