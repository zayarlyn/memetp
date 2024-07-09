import { S3ObjectModel } from '@db/models';
import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { S3Service } from '@services/core';
import { InjectModel } from '@nestjs/sequelize';
import _ from 'lodash';
import { ulid } from 'ulid';
import { FileService } from './file.service';

@Controller('/file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return this.fileService.uploadFiles({ files });
  }
}
