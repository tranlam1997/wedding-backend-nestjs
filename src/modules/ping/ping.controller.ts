import { Body, Controller, Get, Param, Post, Put, Request } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { PingService } from './ping.service';

@Controller('ping')
@ApiTags('Ping')
export class PingController {
  constructor(private readonly service: PingService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'Get event attachment by id',
  })
  @ApiCommonResponse()
  pingToUser(@Request() request: any) {
    return this.service.pingToUser(+request.user.id);
  }
}
