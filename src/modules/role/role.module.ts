import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { Permission } from './models/permission.model';
import { RolePermission } from './models/role-permission.model';
import { RoleController } from "./role.controller";

@Module({
    imports: [SequelizeModule.forFeature([Role, Permission, RolePermission])],
    controllers: [RoleController],
    providers: [],
    exports: [SequelizeModule],
})
export class RoleModule {}