import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Token } from '../token/token.entity';
import { User } from '../user/user.entity';
import { AuthDto } from './auth.dto';
import { imageOptimization } from './lib/image-optimization';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}
  async createNewUser(user: AuthDto, token: string, image: any): Promise<User> {
    const checkToken: Token | null = await this.tokenRepository.findOne({
      where: { value: token },
    });
    const key = this.configService.get('TINIFY_KEY');

    if (!checkToken) {
      throw new NotFoundException('Token not found');
    }

    if ((Date.now() - checkToken.date) / 1000 / 60 > 40) {
      throw new ForbiddenException('Token expired');
    }

    const checkUser: User | null = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: user.email })
      .orWhere('user.phone = :phone', { phone: user.phone })
      .getOne();

    if (checkUser) {
      throw new ConflictException('Email or number already signed');
    }

    await this.tokenRepository.delete({ value: token });
    return await this.userRepository.save({
      ...user,
      image: await imageOptimization(image, key),
      date: Date.now(),
    });
  }
}
