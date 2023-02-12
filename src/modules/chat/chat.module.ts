import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatService } from "./services/chat.service";
import { ChatRoom } from './models/chat-room.model';
import { Participant } from './models/participant.model';
import { ChatController } from "./controllers/like.controller";
import { LikeController } from './controllers/chat.controller';
import { LikeService } from './services/like.service';

@Module({
    imports: [SequelizeModule.forFeature([ChatRoom, Participant])],
    controllers: [ChatController, LikeController],
    providers: [ChatService, LikeService],
    exports: [ChatService, SequelizeModule],
})
export class ChatModule { }