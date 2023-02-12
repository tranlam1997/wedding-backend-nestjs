import { Controller, Get, Param, Query, Post, Body, Request, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { MessageService } from '../services/message.service';

@Controller('messages')
@ApiTags('Message')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Get('room/:id')
  @ApiParam({
    name: 'id',
    description: 'room id',
  })
  @ApiQuery({
    name: 'time',
    description: 'time',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  getMessageByRoomId(@Param('id') id: number, @Query('time') time: string) {
    return this.service.getMessageByRoomId(id, +time);
  }

  @Post()
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  createMessage(@Body() body: any, @Request() req: any) {
    return this.service.createMessage(body, req.user.id);
  }

  @Put('update-content')
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  updateMessageContent(
    @Body() body: { content: string; messageId: number; roomId: number },
    @Request() req: any,
  ) {
    return this.service.updateMessageContent({ ...body, userId: req.user.id });
  }

  @Put('update-like')
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  updateLikeMessage(
    @Body() body: { likes: string; messageId: number; roomId: number },
    @Request() req: any,
  ) {
    return this.service.updateLikeMessage({ ...body, userId: req.user.id });
  }
}
