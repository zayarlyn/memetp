import { Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { lastValueFrom } from 'rxjs'
import _ from 'lodash'
import type { Response } from 'express'

import { FileService } from './file.service'
import { TemplateService } from '../template/template.service'

@Controller('/file')
export class FileController {
  constructor(
    private fileService: FileService,
    private templateService: TemplateService,
  ) {}

  @Get('/:s3ObjectKey')
  async getFile(@Param('s3ObjectKey') s3ObjectKey: string, @Res() reply: Response) {
    const stream = await this.fileService.getFile({ s3ObjectKey })

    return stream
  }

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return this.fileService.uploadFiles({ files })
  }

  @Get('/download/:s3ObjectKey')
  async downloadFile(@Param('s3ObjectKey') s3ObjectKey: string, @Res() reply: Response) {
    const { stream, s3Object } = await this.fileService.downloadFile({ s3ObjectKey })
    this.templateService.updateTemplate({ id: s3Object.modelId, values: { downloads: true } })

    reply.set({
      'Content-Disposition': `attachment; filename="${s3Object.filename}"`,
      'Content-Type': s3Object.mimetype,
    })
    stream.data.pipe(reply)
  }
}
