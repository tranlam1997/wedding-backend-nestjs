import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CustomerModule } from '../customer/customer.module';
import { DatabaseModule } from '../database/database.module';
import { EventModule } from '../event/event.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from '../chat/chat.module';
import { ClientModule } from '../client/client.module';
import { MenuModule } from '../menu/menu.module';
import { MessageModule } from '../message/message.module';
import { RoleModule } from '../role/role.module';
import { TransactionModule } from '../transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from '../address/address.module';
import { AttachmentModule } from '../attachment/attachment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule, 
    CustomerModule, 
    AttachmentModule,
    AddressModule, 
    AuthModule, 
    EventModule, 
    UserModule,
    ChatModule,
    ClientModule,
    MenuModule,
    MessageModule,
    RoleModule,
    TransactionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
