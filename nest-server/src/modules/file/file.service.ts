import { S3ObjectModel } from '@db/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { S3Service } from '@services/core';
import _ from 'lodash';
import { ulid } from 'ulid';

@Injectable()
export class FileService {
  constructor(
    private s3Service: S3Service,
    @InjectModel(S3ObjectModel) private s3ObjectModel: typeof S3ObjectModel,
  ) {}

  async uploadFiles({ files }: { files: Express.Multer.File[] }) {
    const filesWithKey = files.map((file) => ({ ...file, filename: ulid() }));
    await Promise.all(_.map(filesWithKey, (file) => this.s3Service.uploadS3Object({ file })));

    await this.s3ObjectModel.bulkCreate(
      _.map(filesWithKey, (file) => ({ id: file.filename, filename: file.originalname, ..._.pick(file, ['mimetype', 'size']) })),
    );
    return { filenames: _.map(filesWithKey, 'filename') };
  }
}
