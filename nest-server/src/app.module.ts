import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DbModule } from './db/db.module';
import { AuthService } from './modules/auth/auth.service';

@Module({
  imports: [DbModule, AuthModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
