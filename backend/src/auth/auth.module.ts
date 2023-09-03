import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Token } from '../token/token.entity';
import { User } from '../user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token, User]), MulterModule.register()],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
