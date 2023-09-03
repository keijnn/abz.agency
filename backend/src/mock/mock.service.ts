import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { User as IUser } from '../user/user.interface';

@Injectable()
export class MockService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async generateUsers(): Promise<IUser[]> {
    let user: Omit<IUser, 'id'>;
    for (let i = 0; i <= 45; i++) {
      user = {
        name: 'Test' + i,
        email: `test${i}@gmail.com`,
        phone: '+380' + Math.random(),
        position_id: i,
        image: '',
        date: i + Date.now(),
      };
      await this.userRepository.save(user);
    }
    return await this.userRepository.find({
      take: 45,
    });
  }
}
