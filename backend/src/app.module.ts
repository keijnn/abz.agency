import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MockModule } from './mock/mock.module';
import { Token } from './token/token.entity';
import { TokenModule } from './token/token.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MockModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Token, User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
