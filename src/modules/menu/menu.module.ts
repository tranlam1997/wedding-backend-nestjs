import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { Menu } from './models/menu.model';
import { EventMenu } from './models/event-menu.model';
import { MenuController } from "./menu.controller";

@Module({
    imports: [SequelizeModule.forFeature([Menu, EventMenu])],
    controllers: [MenuController],
    providers: [],
    exports: [SequelizeModule],
})
export class MenuModule {}