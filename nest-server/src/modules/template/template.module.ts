import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TemplateModel } from '@db/models';
import { TemplateController } from './template.controller';
import { S3Service } from 'src/services/s3.service';
import { TemplateService } from './template.service';

@Module({
  imports: [SequelizeModule.forFeature([TemplateModel])],
  controllers: [TemplateController],
  providers: [TemplateService, S3Service],
})
export class TemplateModule {}
