import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from "../user/user.service";
import { PublicApiController } from "./public-api.controller";

@Module({
    imports: [],
    controllers: [PublicApiController],
    providers: [UserService],
    exports: [UserService],
})
export class PublicApiModule {}