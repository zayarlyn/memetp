// import { Column, Model, Table, DataType } from 'sequelize-typescript'

// @Table({ tableName: 'template' })
// export default class TemplateModel extends Model {
// 	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
// 	id!: number

// 	@Column({ type: DataType.STRING, allowNull: false })
// 	description!: string

// 	@Column({ type: DataType.JSON, allowNull: false })
// 	s3Object!: object

// 	@Column({ type: DataType.INTEGER, defaultValue: 0 })
// 	likes?: Date

// 	@Column({ type: DataType.INTEGER, defaultValue: 0 })
// 	downloads?: Date
// }

// import { Sequelize, DataTypes } from 'sequelize'
// import { sqDb } from '../db.module'

// const TemplateModel = sqDb.define(
// 	'Template',
// 	{
// 		id: {
// 			type: DataTypes.INTEGER,
// 			primaryKey: true,
// 			autoIncrement: true,
// 		},
// 		description: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		s3Object: {
// 			type: DataTypes.JSON,
// 			allowNull: false,
// 		},
// 		likes: {
// 			type: DataTypes.INTEGER,
// 			defaultValue: 0,
// 		},
// 		downloads: {
// 			type: DataTypes.INTEGER,
// 			defaultValue: 0,
// 		},
// 	},
// 	{
// 		tableName: 'template',
// 		// timestamps: false // if you don't want createdAt and updatedAt columns
// 	}
// )

// export default TemplateModel
