import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { MessageSeenService } from '../services/message-seen.service';

@Controller('message-seen')
@ApiTags('Message Seen')
export class MessageSeenController {
  constructor(private readonly service: MessageSeenService) {}

  @Get()
  getMessageSeen() {
    return this.service.getMessageSeen();
  }

  @Post()
  createMessageSeen(@Body() body: { messageId: number; roomId: number }, @Request() request: any) {
    return this.service.createMessageSeen({ ...body, userId: request.user.id });
  }
}
