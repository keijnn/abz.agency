import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenController } from './token.controller';
import { Token } from './token.entity';
import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
