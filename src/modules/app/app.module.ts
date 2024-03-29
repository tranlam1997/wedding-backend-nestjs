import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { OrderModule } from '../order/order.module';
import { PingModule } from '../ping/ping.module';
import { PublicApiModule } from '../public-api/public-api.module';
import { UploadModule } from '../upload/upload.module';
import { ImageModule } from '../image/image.module';
import { decodeToken } from '@src/middlewares/jwt-auth.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule, 
    CustomerModule, 
    AttachmentModule,
    AddressModule, 
    EventModule, 
    UserModule,
    ChatModule,
    ClientModule,
    MenuModule,
    MessageModule,
    RoleModule,
    TransactionModule,
    OrderModule,
    PingModule,
    PublicApiModule,
    UploadModule,
    ImageModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(decodeToken)
      .exclude('create-user')
      .forRoutes('*')

      ;
  }
}
