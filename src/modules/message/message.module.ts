import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from "./models/message.model";
import { MessageSeen } from "./models/message-seen.model";

@Module({
    imports: [SequelizeModule.forFeature([Message, MessageSeen])],
    controllers: [],
    providers: [],
    exports: [],
})
export class MessageModule {}