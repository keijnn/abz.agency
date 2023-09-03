import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { User } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users/:id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Get('positions')
  async getPositions(): Promise<number[]> {
    return await this.userService.getPositions();
  }

  @Get('users')
  async getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('count', new DefaultValuePipe(1), ParseIntPipe) count: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<{
    users: User[];
    next_link: string | null;
    prev_link: string | null;
    total: number;
  }> {
    return await this.userService.getUsersWithPagination(page, count, offset);
  }
}
