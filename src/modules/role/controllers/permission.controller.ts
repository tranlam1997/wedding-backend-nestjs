import { Body, Controller, Get, Param, Post, Put, Request } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { PermissionService } from '../services/permission.service';
import { Delete } from '@nestjs/common/decorators';

@Controller('permission')
@ApiTags('Permission')
export class PermissionController {
  constructor(private readonly service: PermissionService) {}

  @Get()
  getPermissionList(@Request() request: any) {
    return this.service.getPermissionList(+request.user.id);
  }

  @Get('role/:id')
  getRoleById(@Param('id') id: string) {
    return this.service.getRoleById(+id);
  }

  @Post('add-role-permission')
  createRolePermission(@Body() body: { roleId: number; permissionId: string }) {
    return this.service.createRolePermission(body);
  }

  @Delete('delete-role-permission')
  deleteRolePermission(@Body() body: { roleId: number; permissionId: string }) {
    return this.service.deleteRolePermission(body.roleId, body.permissionId);
  }
}
