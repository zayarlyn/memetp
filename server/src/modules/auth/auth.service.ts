import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { JwtService } from '@nestjs/jwt'

import { SessionModel, UserModel } from '@db/models'
import { AuthBodyDto, AuthServiceDataDto, AuthServiceLoginReplyDto, AuthServiceSignUpReplyDto } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @InjectModel(SessionModel) private sessionModel: typeof SessionModel,
    private jwtService: JwtService,
  ) {}

  async signUp(data: AuthBodyDto): Promise<AuthServiceSignUpReplyDto> {
    const { email, pwd, username } = data
    const existingUser = await this.userModel.findOne({ where: { email } })
    if (existingUser) return { error: { message: 'User already exists', error_code: 'USER_EXISTS' } }

    const userDraft = new this.userModel({ username, name: username, email, pwd })
    await userDraft.save()

    return { data: { user: userDraft } }
  }

  async login(data: AuthServiceDataDto): Promise<AuthServiceLoginReplyDto> {
    const { email, pwd, username, ip } = data
    const existingUser = await this.userModel.findOne({ where: { email } })

    if (!existingUser) return { error: { message: 'User does not exists', error_code: 'USER_NO_EXIST' } }
    if (existingUser.pwd !== pwd) return { error: { message: 'Incorrect password', error_code: 'PASSWORD_INCORRECT' } }

    const session = await this.sessionModel.create({ ipv4: ip, userId: existingUser.id, expireAt: new Date(Date.now() + 1000 * 60) })
    const token = this.jwtService.sign({ userId: existingUser.id, sid: session.id })
    // const apiToken = crypto.randomUUID().toUpperCase().replace(/-/g, '');

    return { data: { token } }
  }

  async refreshToken(token: string): Promise<AuthServiceLoginReplyDto> {
    return
  }
}
