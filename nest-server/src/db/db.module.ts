import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

const sequelizeModule = SequelizeModule.forRootAsync({
  useFactory(configService: ConfigService) {
    return {
      dialect: 'mysql',
      host: configService.get('DB_MYSQL_HOST'),
      port: configService.get('DB_MYSQL_PORT'),
      username: configService.get('DB_MYSQL_USER'),
      database: configService.get('DB_MYSQL_DB'),
      password: configService.get('DB_MYSQL_PWD'),
      define: { paranoid: true, timestamps: true },
      autoLoadModels: true,
      logging: false,
      // synchronize: true,
      // sync: { force: true },
    };
  },
  inject: [ConfigService],
});

@Module({
  imports: [sequelizeModule],
})
export class DbModule {}
