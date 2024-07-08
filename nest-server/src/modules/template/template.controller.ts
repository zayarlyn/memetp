import { Body, Controller, Get, Param, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import _ from 'lodash';

import { TemplateService } from './template.service';
import { ITemplateCreate } from './template.ctype';

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

  @Post('/')
  async createTemplate(@Body() body: ITemplateCreate): Promise<any> {
    const response = await this.templateService.createTemplate(body);

    return response;
  }
}
