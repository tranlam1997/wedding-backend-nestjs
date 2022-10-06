import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Attachment } from "./entities/attachments.entity";
import { EventType } from "./entities/event-types.entity";
import { Event } from "./entities/events.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Attachment, EventType, Event])],
    controllers: [],
    providers: [],
    exports: [],
})
export class EventsModule {}