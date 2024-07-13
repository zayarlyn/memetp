import { S3ObjectModel } from '@db/models'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { S3Service } from '@services/core'

import { FileController } from './file.controller'
import { FileService } from './file.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  controllers: [FileController],
  imports: [SequelizeModule.forFeature([S3ObjectModel]), HttpModule],
  providers: [S3Service, FileService],
})
export class FileModule {}
