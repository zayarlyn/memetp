import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { JwtModule } from '@nestjs/jwt'

import { SessionModel, UserModel } from '@db/models'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, SessionModel]),
    JwtModule.register({ secret: 'jwt_secret', signOptions: { expiresIn: '5m' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
