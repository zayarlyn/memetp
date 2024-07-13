import { HttpException } from '@nestjs/common'
import { Model } from 'sequelize-typescript'

import type { FindOptions } from 'sequelize'

export class BaseModel extends Model {
  static async tpFindOrFail(options: FindOptions) {
    const record = await this.findOne(options)
    if (!record) throw new HttpException('No record found', 404)
    return record.toJSON()
  }

  static async tpFindAll(options: FindOptions) {
    const records = await this.findAll(options)
    return records.map(record => record.toJSON())
  }
}
