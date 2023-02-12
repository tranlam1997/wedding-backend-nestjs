import { Module } from "@nestjs/common";
import { EventType } from "./models/event-type.model";
import { Event } from "./models/event.model";
import { SequelizeModule } from '@nestjs/sequelize';
import { EventController } from "./controllers/event.controller";
import { EventService } from "./services/event.service";
import { ChatModule } from "../chat/chat.module";
import { TransactionModule } from '../transaction/transaction.module';
import { AttachmentModule } from '../attachment/attachment.module';
import { MenuModule } from '../menu/menu.module';
import { EventTypeController } from "./controllers/event-type.controller";
import { EventTypeService } from "./services/event-type.service";

@Module({
    imports: [
        SequelizeModule.forFeature([EventType, Event]),
        ChatModule,
        TransactionModule,
        AttachmentModule,
        MenuModule
    ],
    controllers: [EventController, EventTypeController],
    providers: [EventService, EventTypeService],
    exports: [EventService, EventTypeService, SequelizeModule],
})
export class EventModule { }