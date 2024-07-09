import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { S3Service } from '@services/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { S3ObjectModel } from '@db/models';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  imports: [SequelizeModule.forFeature([S3ObjectModel])],
  providers: [S3Service, FileService],
})
export class FileModule {}
