import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { Menu } from './models/menu.model';
import { EventMenu } from './models/event-menu.model';
import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";

@Module({
    imports: [SequelizeModule.forFeature([Menu, EventMenu])],
    controllers: [MenuController],
    providers: [MenuService],
    exports: [MenuService, SequelizeModule],
})
export class MenuModule {}