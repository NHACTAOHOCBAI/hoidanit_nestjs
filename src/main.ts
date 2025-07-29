/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from 'src/common/filters/htttp-Exception.filter';
import { LoggingInterceptor } from 'src/common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') as number;
  app.setGlobalPrefix('api/v1', { exclude: [''] });
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true
  }));
  //interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());
  //catch global exception
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(port);
}
bootstrap();
