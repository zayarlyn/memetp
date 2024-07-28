import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DbModule } from './db/db.module'
import { AuthorizationMiddleware } from './middlewares/authorization.middleware'
import { FileModule } from './modules/file/file.module'
import { TemplateModule } from './modules/template/template.module'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ServeStaticModule.forRoot({
      rootPath: __dirname + '/public',
      renderPath: '/public',
    }),
    DbModule,
    TemplateModule,
    FileModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('auth')
  }
}

// MesloLoL Nerd Font, BlexMono Nerd Font
