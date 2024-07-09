import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { DbModule } from './db/db.module'
import { AuthorizationMiddleware } from './middlewares/authorization.middleware'
import { TemplateModule } from './modules/template/template.module'
import { ConfigModule } from '@nestjs/config'
import { FileModule } from './modules/file/file.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }), DbModule, AuthModule, TemplateModule, FileModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('auth')
  }
}

// MesloLoL Nerd Font, BlexMono Nerd Font
