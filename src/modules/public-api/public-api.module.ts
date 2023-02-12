import { Module } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PublicApiController } from "./public-api.controller";
import { UserModule } from '../user/user.module';
import { ChatModule } from '../chat/chat.module';

@Module({
    imports: [
        UserModule,
        ChatModule,
    ],
    controllers: [PublicApiController],
    providers: [UserService],
    exports: [UserService],
})
export class PublicApiModule {}