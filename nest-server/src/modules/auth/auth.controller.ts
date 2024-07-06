import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';

import { AuthBodyDto, AuthServiceLoginReplyDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/sign-up')
  async signUp(@Req() req: Request, @Body() body: AuthBodyDto, @Res() reply: Response): Promise<any> {
    const newUser = await this.authService.signUp(body);
    if (newUser.error) return { error: newUser.error };
    console.log(req.ip);

    const loginReply = await this.authService.login({ ...body, ip: req.ip });
    if (loginReply.error) return { error: loginReply.error };

    reply.cookie('token', loginReply.data, { httpOnly: true });
    return loginReply;
  }

  @Post('/login')
  async login(
    @Req() req: Request,
    @Body() body: AuthBodyDto,
    @Res({ passthrough: true }) reply: Response,
  ): Promise<AuthServiceLoginReplyDto> {
    const loginReply = await this.authService.login({ ...body, ip: req.ip });
    if (loginReply.error) return { error: loginReply.error };

    reply.cookie('token', loginReply.data, { httpOnly: true });
    return loginReply;
  }

  @Post('/logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) reply: Response): any {
    // reply.clearCookie('token');
    return 'Hello World!';
    // return req.cookies;
  }
}
