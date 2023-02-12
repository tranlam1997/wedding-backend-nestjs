import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { Permission } from './models/permission.model';
import { RolePermission } from './models/role-permission.model';
import { RoleController } from "./controllers/role.controller";
import { RoleService } from "./services/role.service";
import { PermissionController } from "./controllers/permission.controller";
import { PermissionService } from "./services/permission.service";

@Module({
    imports: [SequelizeModule.forFeature([Role, Permission, RolePermission])],
    controllers: [RoleController, PermissionController],
    providers: [RoleService, PermissionService],
    exports: [RoleService, PermissionService, SequelizeModule],
})
export class RoleModule {}