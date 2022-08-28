import { Injectable } from '@nestjs/common';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ApiConfigService {
  get typeOrmConfig(): TypeOrmModuleOptions {
    const opts = this.getDbConnectionOptions('DB');

    const entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
    const migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    return {
      ...opts,
      entities,
      migrations,
      migrationsRun: true,
    };
  }

  private getDbConnectionOptions(envPrefix: string): TypeOrmModuleOptions {
    return {
      keepConnectionAlive: true,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    };
  }
}
