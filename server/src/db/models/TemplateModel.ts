import { Column, DataType, HasMany, Table } from 'sequelize-typescript'

import { S3ObjectModel } from './S3ObjectModel'
import { BaseModel } from './BaseModel'
import { UserRequestModel } from './UserRequestModel'

@Table({ tableName: 'template' })
export class TemplateModel extends BaseModel {
  @Column({ type: DataType.STRING, allowNull: false })
  title!: string

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  likes?: Date

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  downloads?: Date

  // relations
  @HasMany(() => UserRequestModel)
  userRequests: UserRequestModel[]

  // virtual relations
  @HasMany(() => S3ObjectModel, { foreignKey: 'modelId', constraints: false })
  s3Objects: S3ObjectModel[]
}
