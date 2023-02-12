import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from "./models/message.model";
import { MessageSeen } from "./models/message-seen.model";
import { MessageController } from "./message.controller";

@Module({
    imports: [SequelizeModule.forFeature([Message, MessageSeen])],
    controllers: [MessageController],
    providers: [],
    exports: [SequelizeModule],
})
export class MessageModule {}