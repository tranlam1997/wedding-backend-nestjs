import { Controller, Get, Param, Query, Post, Body, Request, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { MessageService } from '../services/message.service';

@Controller('messages')
@ApiTags('Message')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Get('room/:id')
  getMessageByRoomId(@Param('id') id: number, @Query('time') time: string) {
    return this.service.getMessageByRoomId(id, +time);
  }

  @Post()
  createMessage(@Body() body: any, @Request() req: any) {
    return this.service.createMessage(body, req.user.id);
  }

  @Put('update-content')
  updateMessageContent(
    @Body() body: { content: string; messageId: number; roomId: number },
    @Request() req: any,
  ) {
    return this.service.updateMessageContent({ ...body, userId: req.user.id });
  }

  @Put('update-like')
  updateLikeMessage(
    @Body() body: { likes: string; messageId: number; roomId: number },
    @Request() req: any,
  ) {
    return this.service.updateLikeMessage({ ...body, userId: req.user.id });
  }
}
