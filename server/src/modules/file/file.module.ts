import { S3ObjectModel, TemplateModel } from '@db/models'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { S3Service } from '@services/core'

import { FileController } from './file.controller'
import { FileService } from './file.service'
import { HttpModule } from '@nestjs/axios'
import { TemplateService } from '../template/template.service'

@Module({
  controllers: [FileController],
  imports: [SequelizeModule.forFeature([TemplateModel, S3ObjectModel]), HttpModule],
  providers: [S3Service, FileService, TemplateService],
})
export class FileModule {}
