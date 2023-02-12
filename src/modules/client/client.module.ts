import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";
import { Client } from "./models/client.model";

@Module({
    imports: [SequelizeModule.forFeature([Client])],
    controllers: [ClientController],
    providers: [ClientService],
    exports: [ClientService, SequelizeModule],
})
export class ClientModule {}