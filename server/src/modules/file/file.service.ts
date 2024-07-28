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
import Ffmpeg, { FfprobeStream } from 'fluent-ffmpeg'
import { Readable } from 'stream'
import { join } from 'path'

@Injectable()
export class FileService {
  constructor(
    private s3Service: S3Service,
    private httpService: HttpService,
    @InjectModel(S3ObjectModel) private s3ObjectModel: typeof S3ObjectModel,
  ) {}

  async getFile({ s3ObjectKey }: { s3ObjectKey: string }) {
    const s3Object = await this.getS3Object({ id: s3ObjectKey })
    return this.httpService.get(s3Object.url)
  }

  async uploadFiles({ files }: { files: Express.Multer.File[] }) {
    const filesWithKey = files.map(file => ({ ...file, filename: ulid() }))

    const metadataArray = (await Promise.all(
      _.map(
        files,
        file =>
          new Promise((resolve, reject) => {
            const stream = Readable.from(file.buffer)
            const ffm = Ffmpeg(stream)
            ffm.ffprobe((err, metadata) => {
              if (err) return reject(err)

              const videoStream = metadata.streams.find(stream => stream.codec_type === 'video')
              return resolve(_.pick(videoStream, ['width', 'height']))
            })
            // ffm.screenshot({ timemarks: ['00:00:01'], count: 1, filename: file.filename, folder: join(__dirname, '../../../public') })
          }),
      ),
    )) as FfprobeStream[]

    await Promise.all(_.map(filesWithKey, (file, idx) => this.s3Service.uploadS3Object({ file, metadata: metadataArray[idx] })))
    console.log(metadataArray)

    const s3Objects = _.map(filesWithKey, (file, idx) => ({
      id: file.filename,
      filename: file.originalname,
      ..._.pick(file, 'size', 'minetype'),
      ..._.pick(metadataArray[idx], ['width', 'height']),
    }))
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
