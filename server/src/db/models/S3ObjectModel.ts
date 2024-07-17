import { Column, DataType, Table } from 'sequelize-typescript'
import { BaseModel } from './BaseModel'

@Table({ tableName: 's3_object' })
export class S3ObjectModel extends BaseModel {
  @Column({ type: DataType.STRING, allowNull: false })
  filename!: string

  @Column({ type: DataType.STRING, allowNull: false })
  mimetype!: string

  @Column({ type: DataType.INTEGER, allowNull: false })
  size!: number

  @Column({ field: 'model_name', type: DataType.STRING })
  modelName: string

  @Column({ type: DataType.STRING })
  modelId: string

  @Column({ type: DataType.FLOAT })
  width: number

  @Column({ type: DataType.FLOAT })
  height: number
}
