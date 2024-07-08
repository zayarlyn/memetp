import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { ulid } from 'ulid';

@Table({ tableName: 's3_object' })
export class S3ObjectModel extends Model {
  @Column({ type: DataType.STRING, primaryKey: true, allowNull: false })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  filename!: string;

  @Column({ field: 'mimetype', type: DataType.STRING, allowNull: false })
  mimetype!: string;

  @Column({ field: 'size', type: DataType.INTEGER, allowNull: false })
  size!: number;

  @Column({ field: 'model_name', type: DataType.STRING })
  modelName: string;

  @Column({ type: DataType.STRING })
  modelId: string;

  @Column({ type: DataType.FLOAT })
  width: number;

  @Column({ type: DataType.FLOAT })
  height: number;
}
