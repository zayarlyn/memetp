import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';

import { AuthBodyDto, AuthServiceLoginReplyDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Req() req: Request, @Body() body: AuthBodyDto): Promise<AuthServiceLoginReplyDto> {
    const newUser = await this.authService.signUp(body);
    if (newUser.error) return { error: newUser.error };
    console.log(req.ip);

    const loginReply = await this.authService.login({ ...body, ip: req.ip });
    if (loginReply.error) return { error: loginReply.error };

    return loginReply;
  }

  @Post('/login')
  async login(@Req() req: Request, @Body() body: AuthBodyDto): Promise<AuthServiceLoginReplyDto> {
    const loginReply = await this.authService.login({ ...body, ip: req.ip });
    if (loginReply.error) return { error: loginReply.error };

    return loginReply;
  }

  @Get('/logout')
  logout(): string {
    return 'Hello World!';
  }
}
