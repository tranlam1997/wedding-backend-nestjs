import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get('event/:id')
  @ApiParam({
    name: 'id',
    description: 'event attachment id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  getOrderByEventId(@Param('id') id: string) {
    return this.service.getOrderByEventId(+id);
  }
}
