import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { MockController } from './mock.controller';
import { MockService } from './mock.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [MockController],
  providers: [MockService],
})
export class MockModule {}
