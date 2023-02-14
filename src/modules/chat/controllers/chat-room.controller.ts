import { Controller, Get, Param, Request, Post, Body, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ChatService } from '../services/chat.service';
import { Delete } from '@nestjs/common/decorators';

@Controller('chatrooms')
@ApiTags('Chat Room')
export class ChatRoomController {
  constructor(private readonly service: ChatService) { }

  @Get('public-chatrooms')
  getPublicChatrooms(@Request() req: any) {
    return this.service.getPublicChatRooms(req.user.id);
  }

  @Get('my-private-chatrooms')
  getPrivateChatrooms(@Request() req: any) {
    return this.service.getPublicChatRooms(req.user.id);
  }

  @Get('normal-chatrooms')
  getNormalChatrooms(@Request() req: any) {
    return this.service.getNormalChatRooms(req.user.id);
  }

  @Get('event-chatrooms')
  getEventChatrooms(@Request() req: any) {
    return this.service.getEventChatRooms(req.user.id);
  }

  @Get('event-chatrooms/:id')
  getEventChatroomsById(@Param('id') id: number) {
    return this.service.getEventChatRoomById(id);
  }

  @Post()
  createChatRoom(@Body() body: any, @Request() req: any) {
    return this.service.createChatRoom(body, req.user.id);
  }

  @Put()
  updateChatRoom(@Body() body: any) {
    return this.service.updateChatRoom(body);
  }

  @Delete(':id/leave')
  leaveChatRoom(@Param('id') id: number, @Request() req: any) {
    return this.service.deleteParticipant(id, req.user.id);
  }

  @Post(':id/add-members')
  addMembersToChatRoom(@Param('id') id: number, @Body() body: any) {
    return this.service.createRoomMembers(id, body);
  }
}
