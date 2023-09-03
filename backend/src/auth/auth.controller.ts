import {
  Body,
  Controller,
  Headers,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { User } from '../user/user.interface';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createNewUser(
    @Body() user: AuthDto,
    @Headers('token') token: string,
    @UploadedFile() image: any,
  ): Promise<User> {
    return await this.authService.createNewUser(user, token, image);
  }
}
