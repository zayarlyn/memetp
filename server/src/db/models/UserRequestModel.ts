import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript'

import { BaseModel } from './BaseModel'
import { TemplateModel } from './TemplateModel'

@Table({ tableName: 'user_request' })
export class UserRequestModel extends BaseModel {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number

  @Column({ type: DataType.ENUM('template.submit'), allowNull: false })
  type: string

  @Column({ type: DataType.ENUM('template.submit'), allowNull: false })
  status: string

  @Column({ type: DataType.STRING })
  message: string

  // fks
  @ForeignKey(() => TemplateModel)
  @Column
  templateId: number

  @BelongsTo(() => TemplateModel)
  team: TemplateModel
}
