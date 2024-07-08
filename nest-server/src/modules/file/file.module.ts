import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { S3Service } from '@services/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { S3ObjectModel } from '@db/models';

@Module({
  imports: [SequelizeModule.forFeature([S3ObjectModel])],
  controllers: [FileController],
  providers: [S3Service],
})
export class FileModule {}
