import { Controller, Get, Param, Request, Post, Body, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { ChatService } from '../services/chat.service';
import { Request as RequestExpress } from 'express';
import { Delete } from '@nestjs/common/decorators';

@Controller('chat')
@ApiTags('Chat')
export class ChatController {
  constructor(private readonly service: ChatService) { }

  @Get('recent-messages-lite')
  getRecentMessagesLite(@Request() req: any) {
    return this.service.getRecentMessagesLite(req.user.id);
  }

  @Get('recent-event-messages-lite')
  getRecentEventMessagesLite(@Request() req: any) {
    return this.service.getRecentEventMessagesLite(req.user.id);
  }

  @Get('recent-messagess')
  getRecentMessages(@Request() req: any) {
    return this.service.getRecentMessages(req.user.id);
  }

  @Get('recent-event-messages')
  getRecentEventMessages(@Request() req: any) {
    return this.service.getRecentEventMessages(req.user.id);
  }

  @Get('empty-chatrooms')
  getEmptyChatrooms() {
    return this.service.getEmptyChatrooms();
  }

  @Get('rooms/:id')
  getChatRoomById(@Param('id') id: number) {
    return this.service.getChatRoomById(id);
  }
}
