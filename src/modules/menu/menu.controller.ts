import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { MenuService } from './menu.service';

@Controller('menu')
@ApiTags('Menu')
export class MenuController {
  constructor(private readonly service: MenuService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  getMenu() {
    return this.service.getMenu();
  }

  @Post()
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  createMenu(@Body() body: { name: string; amount: string; price: number }) {
    return this.service.createMenu({ ...body });
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
  updateMenuById(
    @Body() body: { name: string; amount: string; price: number },
    @Param('id') id: string,
  ) {
    return this.service.updateMenuById({ ...body, menuId: +id });
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
  deleteMenuById(@Param('id') id: string) {
    return this.service.deleteMenuById(+id);
  }
}
