import cookieParser from 'cookie-parser'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: '*' })

  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('/api')

  app.use(cookieParser())

  // const app2 = await NestFactory.create(AppModule);
  await app.listen(5050) // FIXME: move to env
  // await app2.listen(5051);
}
bootstrap()
