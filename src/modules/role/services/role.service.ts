import { Injectable } from "@nestjs/common";
import { Role } from "../models/role.model";

@Injectable()
export class RoleService {
    constructor(
        private readonly roleModel: typeof Role,
    ) { }

    async getRoleList() {
        const result = await this.roleModel.findAll();
        return {
            error: false,
            data: result,
            message: "Role list",
        };
    }

    async createRole(role: { name: string }) {
        const result = await this.roleModel.create(role);
        return {
            error: false,
            data: result,
            message: "Role created",
        };
    }

    async updateRole(role: Partial<Role>, roleId: number) {
        const result = await this.roleModel.update(role, {
            where: {
                id: roleId,
            },
        });
        return {
            error: false,
            data: result,
            message: "Role updated",
        };
    }
}