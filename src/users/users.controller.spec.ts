import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Reflector } from '@nestjs/core';
import { NotImplementedException } from '@nestjs/common';

import { mockPrismaService } from '../__mocks__/prisma.service.mock';
import { mockJwtService } from '../__mocks__/jwt.service.mock';
import { mockPasswordService } from '../__mocks__/password.service.mock';
import { mockJwtGuard } from '../__mocks__/jwt.guard.mock';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { PasswordService } from '../auth/password.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
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

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw NotImplementedException when getUsers is called', async () => {
    await expect(controller.getUsers()).rejects.toThrow(
      NotImplementedException,
    );
  });

  it('should throw NotImplementedException when getUserById is called', async () => {
    const userId = '1'; // Example user ID
    await expect(controller.getUserById(userId)).rejects.toThrow(
      NotImplementedException,
    );
  });
});
