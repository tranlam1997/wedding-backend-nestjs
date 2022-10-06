import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [],
    providers: [],
    exports: [],
})
export class UsersModule {}