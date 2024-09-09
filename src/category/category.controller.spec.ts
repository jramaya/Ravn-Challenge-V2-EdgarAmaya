import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { mockJwtService } from '../__mocks__/jwt.service.mock';
import { PrismaService } from 'nestjs-prisma';
import { mockPrismaService } from '../__mocks__/prisma.service.mock';
import { PasswordService } from '../auth/password.service';
import { mockPasswordService } from '../__mocks__/password.service.mock';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { mockJwtGuard } from '../__mocks__/jwt.guard.mock';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        Reflector,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: PasswordService,
          useValue: mockPasswordService,
        },
      ],
    })
      .overrideGuard(JwtGuard)
      .useValue(mockJwtGuard)
      .compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
