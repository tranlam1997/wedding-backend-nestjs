import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { ChatRoom } from './models/chat-room.model';
import { Participant } from './models/participant.model';

@Module({
    imports: [SequelizeModule.forFeature([ChatRoom, Participant])],
    controllers: [ChatController],
    providers: [ChatService],
    exports: [ChatService, SequelizeModule],
})
export class ChatModule {}