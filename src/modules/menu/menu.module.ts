import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { Menu } from './models/menu.model';
import { EventMenu } from './models/event-menu.model';

@Module({
    imports: [SequelizeModule.forFeature([Menu, EventMenu])],
    controllers: [],
    providers: [],
    exports: [],
})
export class MenuModule {}