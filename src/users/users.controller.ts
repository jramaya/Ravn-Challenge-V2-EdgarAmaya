import {
  Controller,
  Get,
  NotImplementedException,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ description: 'List all users', type: [User] })
  async getUsers(): Promise<User[]> {
    throw new NotImplementedException('not implemented');
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ description: 'User information', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getUserById(@Param('id') id: string): Promise<User> {
    throw new NotImplementedException('not implemented');
  }
}
