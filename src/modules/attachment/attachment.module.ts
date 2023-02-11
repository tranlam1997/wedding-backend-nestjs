import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { AttachmentController } from "./attachment.controller";
import { AttachmentService } from "./attachment.service";
import { Attachment } from './models/attachment.model';
import { EventAttachment } from './models/event-attachment.model';
import { MessageAttachment } from "./models/message-attachment.model";
import { PlaceAttachment } from "./models/place-attachment.model";

@Module({
    imports: [SequelizeModule.forFeature([
        Attachment,
        EventAttachment,
        PlaceAttachment,
        MessageAttachment
    ])],
    controllers: [AttachmentController],
    providers: [AttachmentService],
    exports: [AttachmentService],
})
export class AttachmentModule { }