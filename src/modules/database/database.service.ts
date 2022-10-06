import type { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import type { DatabaseConnectionOptions } from './database.interface';

const DatabaseName = {
  MYSQL: 'database.mysql',
};

const enum DatabaseType {
  MYSQL = 'mysql',
}

export function TypeOrmFactory(configService: ConfigService): TypeOrmModuleOptions {
  const databaseConfig = configService.get<DatabaseConnectionOptions>(DatabaseName.MYSQL);
  if (!databaseConfig) {
    return {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'wedding',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy()
    };
  }
  return {
    ...databaseConfig,
    type: DatabaseType.MYSQL,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy()
  };
}
