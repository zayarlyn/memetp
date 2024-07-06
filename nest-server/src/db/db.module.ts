import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

const sequelizeModule = SequelizeModule.forRoot({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'memetp',
  define: { paranoid: true, timestamps: true },
  autoLoadModels: true,
  logging: false,
  synchronize: true,
  // sync: { force: true },
});

@Module({
  imports: [sequelizeModule],
})
export class DbModule {}
