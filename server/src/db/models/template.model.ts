import { Column, DataType, HasMany, Table } from 'sequelize-typescript'

import { S3ObjectModel } from './s3_object.model'
import { BaseModel } from './BaseModel'

@Table({ tableName: 'template' })
export class TemplateModel extends BaseModel {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number

  @Column({ type: DataType.STRING, allowNull: false })
  title!: string

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  likes?: Date

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  downloads?: Date

  // virtual relation
  @HasMany(() => S3ObjectModel, { foreignKey: 'modelId', constraints: false })
  s3Objects: S3ObjectModel[]
}
