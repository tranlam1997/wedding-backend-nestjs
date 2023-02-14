import { Controller, Get, Param, Request, Post, Body, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { ChatService } from '../services/chat.service';
import { Delete } from '@nestjs/common/decorators';

@Controller('chatrooms')
@ApiTags('Chat Room')
export class ChatRoomController {
  constructor(private readonly service: ChatService) { }

  @Get('public-chatrooms')
  @ApiOkResponse({
    status: 200,
    description: 'Get public chat rooms',
  })
  @ApiCommonResponse()
  getPublicChatrooms(@Request() req: any) {
    return this.service.getPublicChatRooms(req.user.id);
  }

  @Get('my-private-chatrooms')
  @ApiOkResponse({
    status: 200,
    description: 'Get private chat rooms',
  })
  @ApiCommonResponse()
  getPrivateChatrooms(@Request() req: any) {
    return this.service.getPublicChatRooms(req.user.id);
  }

  @Get('normal-chatrooms')
  @ApiOkResponse({
    status: 200,
    description: 'Get normal chat rooms',
  })
  @ApiCommonResponse()
  getNormalChatrooms(@Request() req: any) {
    return this.service.getNormalChatRooms(req.user.id);
  }

  @Get('event-chatrooms')
  @ApiOkResponse({
    status: 200,
    description: 'Get event chat rooms',
  })
  @ApiCommonResponse()
  getEventChatrooms(@Request() req: any) {
    return this.service.getEventChatRooms(req.user.id);
  }

  @Get('event-chatrooms/:id')
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

  @Post()
  @ApiOkResponse({
    status: 200,
    description: 'Create chat room',
  })
  @ApiCommonResponse()
  createChatRoom(@Body() body: any, @Request() req: any) {
    return this.service.createChatRoom(body, req.user.id);
  }

  @Put()
  @ApiOkResponse({
    status: 200,
    description: 'update chat room',
  })
  @ApiCommonResponse()
  updateChatRoom(@Body() body: any) {
    return this.service.updateChatRoom(body);
  }

  @Delete(':id/leave')
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

  @Post(':id/add-members')
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
