import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config.provider';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  })]
})
export class ConfigModuleCustom {}