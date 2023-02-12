import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from "./models/user.model";
import { UserController } from "./user.controller";
import { UserService } from './user.service';
import { ChatModule } from '../chat/chat.module';

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        ChatModule,
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService, SequelizeModule],
})
export class UserModule {}