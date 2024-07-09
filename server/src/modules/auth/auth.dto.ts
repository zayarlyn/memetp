import { UserModel } from '@db/models'
import { IsEmail, IsIP, MinLength } from 'class-validator'

export class AuthBodyDto {
  @IsEmail()
  email: string

  @MinLength(4)
  pwd: string

  @MinLength(4)
  username: string
}

export class AuthServiceDataDto extends AuthBodyDto {
  @IsIP()
  ip: string
}

export class AuthServiceSignUpReplyDto {
  error?: { message: string; error_code: string }
  data?: { user: UserModel }
}

export class AuthServiceLoginReplyDto {
  error?: { message: string; error_code: string }
  data?: { token?: string }
}
