import { HttpException } from '@nestjs/common'
import { Column, DataType, Model } from 'sequelize-typescript'

import type { FindOptions } from 'sequelize'

export class BaseModel extends Model {
  static async tpFindOrFail<T>(options: FindOptions, toJson = false) {
    const record = await this.findOne(options)
    if (!record) throw new HttpException('No record found', 404)

    return (toJson ? record.toJSON() : record) as T
  }

  static async tpFindAll(options: FindOptions) {
    const records = await this.findAll(options)
    return records.map(record => record.toJSON())
  }
}
