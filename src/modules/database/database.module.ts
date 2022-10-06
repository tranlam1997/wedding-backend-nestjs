import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmFactory } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: TypeOrmFactory,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options as DataSourceOptions).initialize();
        return dataSource;
      },
    }),
  ],
})
export class DatabaseModule {}