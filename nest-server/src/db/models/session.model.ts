import { Column, Model, Table, DataType, ForeignKey, IsUUID, PrimaryKey } from 'sequelize-typescript';
import UserModel from './user.model';

@Table({ tableName: 'session' })
export default class SessionModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  ipv4!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  expireAt!: Date;

  @ForeignKey(() => UserModel)
  userId!: string;
}
