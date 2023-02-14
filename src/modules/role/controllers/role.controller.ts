import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { RoleService } from '../services/role.service';

@Controller('role')
@ApiTags('Role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Get()
  getRoleList() {
    return this.service.getRoleList();
  }

  @Post()
  createRole(@Body() body: { name: string }) {
    return this.service.createRole(body);
  }

  @Put(':id')
  updateRole(@Body() body: { name: string }, @Param('id') id: string) {
    return this.service.updateRole(body, +id);
  }
}
