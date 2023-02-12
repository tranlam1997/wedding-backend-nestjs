import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { RoleService } from '../services/role.service';

@Controller('role')
@ApiTags('Role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  getRoleList() {
    return this.service.getRoleList();
  }

  @Post()
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  createRole(@Body() body: { name: string }) {
    return this.service.createRole(body);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'event attachment id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  updateRole(@Body() body: { name: string }, @Param('id') id: string) {
    return this.service.updateRole(body, +id);
  }
}
