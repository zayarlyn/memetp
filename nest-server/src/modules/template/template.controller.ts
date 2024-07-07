import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import {} from 'sequelize-typescript';

// import { AuthBodyDto, AuthServiceLoginReplyDto } from './auth.dto';
// import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import _ from 'lodash';
import { TemplateService } from './template.service';

@Controller('/template')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Get('/')
  async listTemplates(@Req() req: Request, @Body() body: any): Promise<any> {
    const {} = body;
    const templates = await this.templateService.getTemplates({});
    return templates;
  }

  @Get('/:tpId')
  async getTemplate(@Req() req: Request, @Param() param: any): Promise<any> {
    const { tpId } = param;
    const templates = await this.templateService.getTemplates({ id: tpId });
    return templates[0];
  }
}
