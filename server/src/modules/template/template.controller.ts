import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import _ from 'lodash'

import { TemplateService } from './template.service'
import type { ITemplateCreate } from './template.ctype'

@Controller('/template')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Get('/')
  async getTemplates(@Body() body: any): Promise<any> {
    return await this.templateService.getTemplates({})
  }

  @Post('/')
  async createTemplate(@Body() body: ITemplateCreate) {
    return await this.templateService.createTemplate(body)
  }

  @Get('/:tpId')
  async getTemplate(@Param() { tpId }: { tpId: string }): Promise<any> {
    const templates = await this.templateService.getTemplates({ id: tpId })
    return templates[0]
  }
}
