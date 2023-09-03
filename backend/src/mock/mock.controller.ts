import { Controller, Get } from '@nestjs/common';

import { User } from '../user/user.interface';
import { MockService } from './mock.service';

@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Get()
  async generateUsers(): Promise<User[]> {
    return await this.mockService.generateUsers();
  }
}
