import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');

  app.use(cookieParser());

  // const app2 = await NestFactory.create(AppModule);
  await app.listen(5050);
  // await app2.listen(5051);
}
bootstrap();
