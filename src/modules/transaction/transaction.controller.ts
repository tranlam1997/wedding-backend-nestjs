import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { TransactionService } from './transaction.service';
import { Delete } from '@nestjs/common/decorators';

@Controller('transaction')
@ApiTags('Transaction')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Get('event/:id/deposit')
  @ApiParam({
    name: 'id',
    description: 'event id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get all transactions success',
  })
  @ApiCommonResponse()
  getDepositByEventId(@Param('id') id: string) {
    return this.service.getDepositByEventId({
      eventId: +id,
    });
  }

  @Get('event/:id')
  @ApiParam({
    name: 'id',
    description: 'event id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get all transactions success',
  })
  @ApiCommonResponse()
  getEvent(@Param('id') id: string) {
    return this.service.getEvent(+id);
  }

  @Post()
  @ApiParam({
    name: 'id',
    description: 'event id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get all transactions success',
  })
  @ApiCommonResponse()
  createTransaction(
    @Body() body: { eventId: number; value: number; date: number; note: string; attachments: any },
  ) {
    return this.service.createTransaction({ ...body });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'transaction id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get all transactions success',
  })
  @ApiCommonResponse()
  deleteTransactionById(@Param('id') id: string) {
    return this.service.deleteTransactionById(+id);
  }
}
