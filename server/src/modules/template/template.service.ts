import { S3ObjectModel, TemplateModel } from '@db/models'
import { Body, Injectable, Req } from '@nestjs/common'
import _ from 'lodash'
import { ITemplate, ITemplateCreate } from './template.ctype'
import { S3Service } from '@services/core'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class TemplateService {
  constructor(
    private s3Service: S3Service,
    @InjectModel(TemplateModel) private templateModel: typeof TemplateModel,
    @InjectModel(S3ObjectModel) private s3ObjectModel: typeof S3ObjectModel,
  ) {}

  async getTemplates({ id }: { id?: string }): Promise<ITemplate[]> {
    const where = id ? { id } : undefined
    const dbTemplates = await this.templateModel.findAll({ where })
    const templates = _.map(dbTemplates, tp => tp.toJSON())
    const s3Urls = await Promise.all(_.map(templates, tp => this.s3Service.getS3ObjectUrl({ key: tp.s3Object, promise: true })))
    const result = _.map(templates, (tp, idx) => ({ ...tp, url: s3Urls[idx] }))
    return result
  }

  async createTemplate(data: ITemplateCreate): Promise<{ id: number }> {
    const { s3ObjectKeys, ...templateFields } = data
    const tp = await this.templateModel.create(templateFields)
    // n + 1 query 🫠
    await Promise.all(
      _.map(s3ObjectKeys, key =>
        this.s3ObjectModel.update({ modelName: TemplateModel.getTableName(), modelId: tp.id }, { where: { id: key } }),
      ),
    )
    return { id: tp.id }
  }
}

// {
//   [nest-server]     fieldname: 'files',
//   [nest-server]     originalname: 'gentype.js',
//   [nest-server]     encoding: '7bit',
//   [nest-server]     mimetype: 'application/javascript',
//   [nest-server]     buffer: <Buffer 63 6f 6e 73 74 20 66 73 20 3d 20 72 65 71 75 69 72 65 28 27 66 73 27 29 0a 0a 6c 65 74 20 74 79 70 65 73 53 74 72 69 6e 67 20 3d 20 27 27 0a 0a 66 75 ... 582 more bytes>,
//   [nest-server]     size: 632
//   [nest-server]   }

// [
// [nest-server]   {
// [nest-server]     fieldname: 'files',
// [nest-server]     originalname: 'image.png',
// [nest-server]     encoding: '7bit',
// [nest-server]     mimetype: 'image/png',
// [nest-server]     buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 81 00 00 04 24 08 06 00 00 00 73 05 68 9d 00 00 01 56 69 43 43 50 49 43 43 20 50 72 6f 66 69 ... 126094 more bytes>,
// [nest-server]     size: 126144
// [nest-server]   }
// [nest-server] ]
