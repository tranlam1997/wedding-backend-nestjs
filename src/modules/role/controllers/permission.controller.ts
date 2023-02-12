import { Body, Controller, Get, Param, Post, Put, Request } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { PermissionService } from '../services/permission.service';
import { Delete } from '@nestjs/common/decorators';

@Controller('permission')
@ApiTags('Permission')
export class PermissionController {
  constructor(private readonly service: PermissionService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  getPermissionList(@Request() request: any) {
    return this.service.getPermissionList(+request.user.id);
  }

  @Get('role/:id')
  @ApiParam({
    name: 'id',
    description: 'role id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  getRoleById(@Param('id') id: string) {
    return this.service.getRoleById(+id);
  }

  @Post('add-role-permission')
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  createRolePermission(@Body() body: { roleId: number; permissionId: string }) {
    return this.service.createRolePermission(body);
  }

  @Delete('delete-role-permission')
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  deleteRolePermission(@Body() body: { roleId: number; permissionId: string }) {
    return this.service.deleteRolePermission(body.roleId, body.permissionId);
  }
}
