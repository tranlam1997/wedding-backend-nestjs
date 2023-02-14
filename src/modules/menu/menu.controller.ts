import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { MenuService } from './menu.service';

@Controller('menu')
@ApiTags('Menu')
export class MenuController {
  constructor(private readonly service: MenuService) {}

  @Get()
  getMenu() {
    return this.service.getMenu();
  }

  @Post()
  createMenu(@Body() body: { name: string; amount: string; price: number }) {
    return this.service.createMenu({ ...body });
  }

  @Put(':id')
  updateMenuById(
    @Body() body: { name: string; amount: string; price: number },
    @Param('id') id: string,
  ) {
    return this.service.updateMenuById({ ...body, menuId: +id });
  }

  @Put(':id')
  deleteMenuById(@Param('id') id: string) {
    return this.service.deleteMenuById(+id);
  }
}
