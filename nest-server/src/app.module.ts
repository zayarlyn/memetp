import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DbModule } from './db/db.module';
import { AuthorizationMiddleware } from './middlewares/authorization.middleware';
import { TemplateModule } from './modules/template/template.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }), DbModule, AuthModule, TemplateModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('auth');
  }
}
