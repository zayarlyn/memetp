import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'template' })
export default class TemplateModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  s3Object!: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  likes?: Date;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  downloads?: Date;
}
