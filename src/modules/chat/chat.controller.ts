import { Controller, Get, Param, Request, Post, Body, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { ChatService } from './chat.service';
import { Request as RequestExpress } from 'express';
import { Delete } from '@nestjs/common/decorators';

@Controller('chat')
@ApiTags('Chat')
export class ChatController {
  constructor(private readonly service: ChatService) {}

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

  @Get('chatrooms/public-chatrooms')
  @ApiOkResponse({
    status: 200,
    description: 'Get public chat rooms',
  })
  @ApiCommonResponse()
  getPublicChatrooms(@Request() req: any) {
    return this.service.getPublicChatRooms(req.user.id);
  }

  @Get('chatrooms/my-private-chatrooms')
  @ApiOkResponse({
    status: 200,
    description: 'Get private chat rooms',
  })
  @ApiCommonResponse()
  getPrivateChatrooms(@Request() req: any) {
    return this.service.getPublicChatRooms(req.user.id);
  }

  @Get('chatrooms/normal-chatrooms')
  @ApiOkResponse({
    status: 200,
    description: 'Get normal chat rooms',
  })
  @ApiCommonResponse()
  getNormalChatrooms(@Request() req: any) {
    return this.service.getNormalChatRooms(req.user.id);
  }

  @Get('chatrooms/event-chatrooms')
  @ApiOkResponse({
    status: 200,
    description: 'Get event chat rooms',
  })
  @ApiCommonResponse()
  getEventChatrooms(@Request() req: any) {
    return this.service.getEventChatRooms(req.user.id);
  }

  @Get('chatrooms/event-chatrooms/:id')
  @ApiParam({
    name: 'id',
    description: 'event id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get public chat rooms',
  })
  @ApiCommonResponse()
  getEventChatroomsById(@Param('id') id: number) {
    return this.service.getEventChatRoomById(id);
  }

  @Post('chatrooms')
  @ApiOkResponse({
    status: 200,
    description: 'Create chat room',
  })
  @ApiCommonResponse()
  createChatRoom(@Body() body: any, @Request() req: any) {
    return this.service.createChatRoom(body, req.user.id);
  }

  @Put('chatrooms')
  @ApiOkResponse({
    status: 200,
    description: 'update chat room',
  })
  @ApiCommonResponse()
  updateChatRoom(@Body() body: any) {
    return this.service.updateChatRoom(body);
  }

  @Delete('chatrooms/:id/leave')
  @ApiParam({
    name: 'id',
    description: 'chat room id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Leave chat room',
  })
  @ApiCommonResponse()
  leaveChatRoom(@Param('id') id: number, @Request() req: any) {
    return this.service.deleteParticipant(id, req.user.id);
  }

  @Post('chatrooms/:id/add-members')
  @ApiParam({
    name: 'id',
    description: 'chat room id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Add members to chat room',
  })
  @ApiCommonResponse()
  addMembersToChatRoom(@Param('id') id: number, @Body() body: any) {
    return this.service.createRoomMembers(id, body);
  }
}
