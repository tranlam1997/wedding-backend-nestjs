import { Controller, Get, Param, Request, Post, Body, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { ChatService } from '../services/chat.service';
import { Request as RequestExpress } from 'express';
import { Delete } from '@nestjs/common/decorators';

@Controller('chat')
@ApiTags('Chat')
export class ChatController {
  constructor(private readonly service: ChatService) { }

  @Get('recent-messages-lite')
  @ApiOkResponse({
    status: 200,
    description: 'Get recent messages lite',
  })
  @ApiCommonResponse()
  getRecentMessagesLite(@Request() req: any) {
    return this.service.getRecentMessagesLite(req.user.id);
  }

  @Get('recent-event-messages-lite')
  @ApiOkResponse({
    status: 200,
    description: 'Get recent event messages lite',
  })
  @ApiCommonResponse()
  getRecentEventMessagesLite(@Request() req: any) {
    return this.service.getRecentEventMessagesLite(req.user.id);
  }

  @Get('recent-messagess')
  @ApiOkResponse({
    status: 200,
    description: 'Get recent messages',
  })
  @ApiCommonResponse()
  getRecentMessages(@Request() req: any) {
    return this.service.getRecentMessages(req.user.id);
  }

  @Get('recent-event-messages')
  @ApiOkResponse({
    status: 200,
    description: 'Get recent event messages',
  })
  @ApiCommonResponse()
  getRecentEventMessages(@Request() req: any) {
    return this.service.getRecentEventMessages(req.user.id);
  }

  @Get('empty-chatrooms')
  @ApiOkResponse({
    status: 200,
    description: 'Get empty chat room',
  })
  @ApiCommonResponse()
  getEmptyChatrooms() {
    return this.service.getEmptyChatrooms();
  }

  @Get('rooms/:id')
  @ApiParam({
    name: 'id',
    description: 'chat room id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get chat room by id',
  })
  @ApiCommonResponse()
  getChatRoomById(@Param('id') id: number) {
    return this.service.getChatRoomById(id);
  }
}
