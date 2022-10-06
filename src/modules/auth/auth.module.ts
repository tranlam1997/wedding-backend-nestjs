import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { Role } from "./auth.entity";
import { AuthService } from "./auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}