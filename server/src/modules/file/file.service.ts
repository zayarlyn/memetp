import { Injectable } from '@nestjs/common'
import { ulid } from 'ulid'
import _ from 'lodash'
import { Response } from 'express'

import { S3ObjectModel } from '@db/models'
import { InjectModel } from '@nestjs/sequelize'
import { S3Service } from '@services/core'
import { IS3Object } from '../template/template.ctype'
import { lastValueFrom } from 'rxjs'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class FileService {
  constructor(
    private s3Service: S3Service,
    private httpService: HttpService,
    @InjectModel(S3ObjectModel) private s3ObjectModel: typeof S3ObjectModel,
  ) {}

  async uploadFiles({ files }: { files: Express.Multer.File[] }) {
    const filesWithKey = files.map(file => ({ ...file, filename: ulid() }))
    await Promise.all(_.map(filesWithKey, file => this.s3Service.uploadS3Object({ file })))

    const s3Objects = _.map(filesWithKey, file => ({ id: file.filename, filename: file.originalname, size: file.size, mimetype: file.mimetype }))
    await this.s3ObjectModel.bulkCreate(s3Objects)

    return { filenames: _.map(filesWithKey, 'filename') }
  }

  async downloadFile({ s3ObjectKey }: { s3ObjectKey: string }) {
    const s3Object = await this.getS3Object({ id: s3ObjectKey })
    const stream = await lastValueFrom(this.httpService.get(s3Object.url, { responseType: 'stream' }))

    return { stream, s3Object }
  }

  private async getS3Object({ id }: { id: string }): Promise<IS3Object> {
    const s3Object = await this.s3ObjectModel.tpFindOrFail<S3ObjectModel>({ where: { id } })
    const s3Url = await this.s3Service.getS3ObjectUrl({ key: id })

    return { ...s3Object.toJSON(), url: s3Url }
  }
}
