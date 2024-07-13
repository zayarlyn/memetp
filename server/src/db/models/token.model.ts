import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { ulid } from 'ulid'

@Table({ tableName: 'token' })
export class TemplateModel extends Model {
  @Column({ type: DataType.STRING, primaryKey: true, defaultValue: ulid() })
  id!: string

  @Column({ type: DataType.ENUM('file.download'), allowNull: false })
  type: string

  @Column({ type: DataType.JSON, allowNull: false })
  data: object

  @Column({ type: DataType.DATE, allowNull: false })
  expireAt: Date
}
