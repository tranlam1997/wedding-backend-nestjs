import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@src/modules/user/models/user.model';
import { Permission } from '../models/permission.model';
import { RolePermission } from '../models/role-permission.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(RolePermission) private readonly rolePermissionModel: typeof RolePermission,
    private sequelize: Sequelize,
  ) {}

  async getPermissionList(userId: number) {
    const user = await this.userModel.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const permissions = await this.rolePermissionModel.findOne({
      where: {
        roleId: user.roleId,
      },
    });

    return {
      error: false,
      data: permissions,
      message: 'Permission list',
    };
  }

  async getRoleById(roleId: number) {
    const result = await this.rolePermissionModel.findOne({
      where: {
        roleId: roleId,
      },
    });

    return {
      error: false,
      data: result,
      message: 'Role list',
    };
  }

  async createRolePermission(rolePermission: { roleId: number; permissionId: string }) {
    const seqTrans = await this.sequelize.transaction();
    try {
      await this.rolePermissionModel.destroy({
        where: {
          roleId: rolePermission.roleId,
          permissionName: rolePermission.permissionId,
        },
        transaction: seqTrans,
      });

      const result = await this.rolePermissionModel.create(rolePermission);
      return {
        error: false,
        data: result,
        message: 'Role permission created',
      };
    } catch (err) {
      await seqTrans.rollback();
      throw err;
    }
  }

  async deleteRolePermission(roleId: number, permissionId: string) {
    const seqTrans = await this.sequelize.transaction();
    try {
      await this.rolePermissionModel.destroy({
        where: {
          roleId: roleId,
          permissionName: permissionId,
        },
        transaction: seqTrans,
      });
      return {
        error: false,
        message: 'Role permission deleted',
      };
    } catch (err) {
      await seqTrans.rollback();
      throw err;
    }
  }
}
