import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from "./models/message.model";
import { MessageSeen } from "./models/message-seen.model";
import { MessageController } from "./controllers/message.controller";
import { MessageService } from "./services/message.service";
import { MessageSeenController } from "./controllers/message-seen.controller";
import { MessageSeenService } from "./services/message-seen.service";
import { AttachmentModule } from "../attachment/attachment.module";

@Module({
    imports: [
        SequelizeModule.forFeature([Message, MessageSeen]),
        AttachmentModule,
    ],
    controllers: [MessageController, MessageSeenController],
    providers: [MessageService, MessageSeenService],
    exports: [MessageService, MessageSeenService, SequelizeModule],
})
export class MessageModule { }