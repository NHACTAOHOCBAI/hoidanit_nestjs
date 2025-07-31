import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from 'src/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    AuthModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
