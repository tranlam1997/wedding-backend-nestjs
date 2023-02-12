import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { MessageSeenService } from '../services/message-seen.service';

@Controller('message-seen')
@ApiTags('Message Seen')
export class MessageSeenController {
  constructor(private readonly service: MessageSeenService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  getMessageSeen() {
    return this.service.getMessageSeen();
  }

  @Post()
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  createMessageSeen(@Body() body: { messageId: number; roomId: number }, @Request() request: any) {
    return this.service.createMessageSeen({ ...body, userId: request.user.id });
  }
}
