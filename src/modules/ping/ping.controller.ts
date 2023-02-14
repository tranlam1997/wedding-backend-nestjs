import { Body, Controller, Get, Param, Post, Put, Request } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { PingService } from './ping.service';

@Controller('ping')
@ApiTags('Ping')
export class PingController {
  constructor(private readonly service: PingService) {}

  @Get()
  pingToUser(@Request() request: any) {
    return this.service.pingToUser(+request.user.id);
  }
}
