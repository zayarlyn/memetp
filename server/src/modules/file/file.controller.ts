import { Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { lastValueFrom } from 'rxjs'
import _ from 'lodash'
import type { Response } from 'express'

import { FileService } from './file.service'
import { HttpService } from '@nestjs/axios'

@Controller('/file')
export class FileController {
  constructor(
    private fileService: FileService,
    private httpService: HttpService,
  ) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return this.fileService.uploadFiles({ files })
  }

  @Get('/download/:s3ObjectKey')
  async downloadFile(@Param('s3ObjectKey') s3ObjectKey: string, @Res() reply: Response) {
    return this.fileService.downloadFile({ s3ObjectKey, reply })
  }
}
