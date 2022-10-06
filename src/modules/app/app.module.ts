import { Module } from '@nestjs/common';
import { AddressModule } from '../address/address.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModuleCustom } from '../config/config.module';
import { CustomersModule } from '../customers/customers.module';
import { DatabaseModule } from '../database/database.module';
import { EventsModule } from '../events/events.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, ConfigModuleCustom, CustomersModule, AddressModule, AuthModule, EventsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
