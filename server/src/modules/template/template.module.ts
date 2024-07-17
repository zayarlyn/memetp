import { S3ObjectModel, TemplateModel, UserRequestModel } from '@db/models'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { S3Service } from '@services/core'

import { TemplateController } from './template.controller'
import { TemplateService } from './template.service'

@Module({
  imports: [SequelizeModule.forFeature([TemplateModel, S3ObjectModel, UserRequestModel])],
  controllers: [TemplateController],
  providers: [TemplateService, S3Service],
})
export class TemplateModule {}
