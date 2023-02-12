import { Module } from "@nestjs/common";
import { EventType } from "./models/event-type.model";
import { Event } from "./models/event.model";
import { SequelizeModule } from '@nestjs/sequelize';
import { EventController } from "./event.controller";
import { EventService } from "./event.service";

@Module({
    imports: [SequelizeModule.forFeature([EventType, Event])],
    controllers: [EventController],
    providers: [EventService],
    exports: [EventService],
})
export class EventModule { }