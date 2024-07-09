import { Column, Model, Table, DataType } from 'sequelize-typescript'

@Table({ tableName: 'user' })
export class UserModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  username!: string

  @Column({ type: DataType.STRING, allowNull: false })
  email!: string

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string

  @Column({ type: DataType.STRING, allowNull: false })
  pwd!: string

  @Column({ type: DataType.DATE })
  emailVerifiedAt?: Date

  @Column({ type: DataType.DATE })
  restrictUntil?: Date
}
