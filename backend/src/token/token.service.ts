import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async generateNewToken(): Promise<{ value: string; date: number }> {
    function randomToken(): string {
      return Math.random().toString(36).slice(2);
    }

    const token = {
      value: randomToken() + randomToken(),
      date: Date.now(),
    };

    return await this.tokenRepository.save(token);
  }
}
