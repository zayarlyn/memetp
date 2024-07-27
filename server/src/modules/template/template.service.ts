import { S3ObjectModel, TemplateModel } from '@db/models'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import _ from 'lodash'

import { S3Service } from '@services/core'
import { ITemplate, ITemplateCreate } from './template.ctype'

@Injectable()
export class TemplateService {
  constructor(
    private s3Service: S3Service,
    @InjectModel(TemplateModel) private templateModel: typeof TemplateModel,
    @InjectModel(S3ObjectModel) private s3ObjectModel: typeof S3ObjectModel,
  ) {}

  async getTemplates({ id }: { id?: string }): Promise<ITemplate[]> {
    const dbTemplates = await this.templateModel.tpFindAll({ where: id ? { id } : {}, include: [S3ObjectModel] })

    const urlMatrix = await Promise.all(
      _.map(dbTemplates, tp => Promise.all(_.map(tp.s3Objects, s3Object => this.s3Service.getS3ObjectUrl({ key: s3Object.id })))),
    )

    const templates = _.reduce(
      dbTemplates,
      (tpArray, tp, i) => {
        const s3Objects = _.map(tp.s3Objects, (s3Object, j) => ({ ...s3Object, url: urlMatrix[i][j] }))
        return [...tpArray, { ...tp, s3Objects }]
      },
      [],
    )

    return templates
  }

  async createTemplate(data: ITemplateCreate): Promise<{ id: number }> {
    const { s3ObjectKeys, ...templateFields } = data
    const tp = await this.templateModel.create(templateFields)
    console.log(data)

    // n + 1 query 🫠
    await Promise.all(
      _.map(s3ObjectKeys, key => this.s3ObjectModel.update({ modelName: TemplateModel.getTableName(), modelId: tp.id }, { where: { id: key } })),
    )
    return { id: tp.id }
  }

  async updateTemplate({ id, values }: { id?: string; values: any }): Promise<ITemplate> {
    const dbTemplate = await this.templateModel.tpFindOrFail<TemplateModel>({ where: { id } })
    dbTemplate.set(_.omit(values, ['downloads', 'likes']))
    if (values.downloads === true) dbTemplate.downloads += 1
    if (values.likes === true) dbTemplate.likes += 1
    await dbTemplate.save()

    return dbTemplate.toJSON()
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
