import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { TransactionService } from './transaction.service';
import { Delete } from '@nestjs/common/decorators';

@Controller('transaction')
@ApiTags('Transaction')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Get('event/:id/deposit')
  getDepositByEventId(@Param('id') id: string) {
    return this.service.getDepositByEventId({
      eventId: +id,
    });
  }

  @Get('event/:id')
  getEvent(@Param('id') id: string) {
    return this.service.getEvent(+id);
  }

  @Post()
  createTransaction(
    @Body() body: { eventId: number; value: number; date: number; note: string; attachments: any },
  ) {
    return this.service.createTransaction({ ...body });
  }

  @Delete(':id')
  deleteTransactionById(@Param('id') id: string) {
    return this.service.deleteTransactionById(+id);
  }
}
