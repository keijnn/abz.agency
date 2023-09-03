// user.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sharp from 'sharp';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getPositions(): Promise<number[]> {
    const positions = await this.userRepository.find({
      select: {
        position_id: true,
      },
    });
    return [...new Set(positions.map(el => el.position_id))];
  }

  async getUsersWithPagination(
    page: number,
    count: number,
    offset = 0,
  ): Promise<{
    users: User[];
    next_link: string | null;
    prev_link: string | null;
    total: number;
  }> {
    if (page < 1 || count < 1 || count > 100) {
      throw new ConflictException('Page or count out of range');
    }

    offset = (page - 1) * count;

    const [users, total] = await this.userRepository.findAndCount({
      skip: offset,
      take: count,
    });

    try {
      for (const user of users) {
        if (user.image.length > 0) {
          user.image = await sharp(user.image)
            .toBuffer()
            .then(buffer => buffer.toString('base64'));
        }
      }
    } catch (error) {
      console.error('Error converting image to Base64:', error);
      throw new Error('Image conversion failed');
    }

    const next_page = page + 1;
    const prev_page = page - 1;

    const next_link =
      offset + count < total ? `/users?page=${next_page}&count=${count}` : null;
    const prev_link =
      offset > 0 ? `/users?page=${prev_page}&count=${count}` : null;

    return {
      users: users.sort((a, b) => b.date - a.date),
      next_link,
      prev_link,
      total,
    };
  }
}
