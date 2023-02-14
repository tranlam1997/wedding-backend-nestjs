import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { OrderService } from './order.service';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get('event/:id')
  getOrderByEventId(@Param('id') id: string) {
    return this.service.getOrderByEventId(+id);
  }
}
