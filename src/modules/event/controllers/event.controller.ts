import { Controller, Get, Param, Query, Post, Body, Request, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { EventService } from '../services/event.service';
import { Delete } from '@nestjs/common/decorators';

@Controller('events')
@ApiTags('Event')
export class EventController {
  constructor(private readonly service: EventService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'Get event success',
  })
  @ApiCommonResponse()
  getProvinces() {
    return this.service.getEvents();
  }

  @Get('schedule')
  @ApiQuery({
    name: 'startDate',
    description: 'Start date',
    required: true,
  })
  @ApiQuery({
    name: 'endDate',
    description: 'End date',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get schedule success',
  })
  @ApiCommonResponse()
  getSchedule(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.service.getSchedule({ startDate, endDate });
  }

  @Get('by-month')
  @ApiQuery({
    name: 'year',
    description: 'year',
    required: true,
  })
  @ApiQuery({
    name: 'month',
    description: 'month',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get event by month success',
  })
  @ApiCommonResponse()
  getEventByMonth(@Query('year') year: string, @Query('month') month: string) {
    return this.service.getEventByMonth({ year, month });
  }

  @Get('by-day')
  @ApiQuery({
    name: 'year',
    description: 'year',
    required: true,
  })
  @ApiQuery({
    name: 'month',
    description: 'month',
    required: true,
  })
  @ApiQuery({
    name: 'day',
    description: 'day',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get event by month success',
  })
  @ApiCommonResponse()
  getEventByDay(
    @Query('year') year: string,
    @Query('month') month: string,
    @Query('day') day: string,
  ) {
    return this.service.getEventByDay({ year, month, day });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Event id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get schedule at place success',
  })
  @ApiCommonResponse()
  getEventById(@Param('id') id: string) {
    return this.service.getEventById(id);
  }

  @Post()
  @ApiOkResponse({
    status: 200,
    description: 'create event success',
  })
  @ApiCommonResponse()
  createEvent(@Body() body: any, @Request() req: any) {
    return this.service.createEvent(body, req.user.id);
  }

  @Put()
  @ApiOkResponse({
    status: 200,
    description: 'update event success',
  })
  @ApiCommonResponse()
  updateEvent(@Body() body: any, @Request() req: any) {
    return this.service.updateEvent(body, req.user.id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Event id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'update event success',
  })
  @ApiCommonResponse()
  deleteEvent(@Param('id') id: string) {
    return this.service.deleteEventById(+id);
  }

  @Put('update-customer')
  @ApiOkResponse({
    status: 200,
    description: 'update event success',
  })
  @ApiCommonResponse()
  updateCustomer(@Body() body: { eventId: number; customerId: number }) {
    return this.service.updateCustomer({
      id: body.eventId,
      customerId: body.customerId,
    });
  }

  @Put('update-title')
  @ApiOkResponse({
    status: 200,
    description: 'update event success',
  })
  @ApiCommonResponse()
  updateTitle(@Body() body: { eventId: number; title: string }) {
    return this.service.updateTitle({
      id: body.eventId,
      title: body.title,
    });
  }

  @Put('update-attachment')
  @ApiOkResponse({
    status: 200,
    description: 'update event success',
  })
  @ApiCommonResponse()
  updateAttachment(@Body() body: { eventId: number; attachments: any }) {
    return this.service.updateAttachment({
      id: body.eventId,
      attachments: body.attachments,
    });
  }

  @Put('update-guest-estimate')
  @ApiOkResponse({
    status: 200,
    description: 'update event success',
  })
  @ApiCommonResponse()
  updateGuestEstimate(@Body() body: { eventId: number; guestEstimate: string }) {
    return this.service.updateGuestEstimate({
      id: body.eventId,
      guestEstimate: body.guestEstimate,
    });
  }

  @Put('update-place-and-time')
  @ApiOkResponse({
    status: 200,
    description: 'update event success',
  })
  @ApiCommonResponse()
  updatePlaceAndTime(
    @Body()
    body: {
      eventId: number;
      placeId: number;
      startTime: string;
      endTime: string;
      title: string;
    },
  ) {
    return this.service.updatePlaceAndTime({
      id: body.eventId,
      placeId: body.placeId,
      startTime: +body.startTime,
      endTime: +body.endTime,
      title: body.title,
    });
  }

  @Put('update-time')
  @ApiOkResponse({
    status: 200,
    description: 'update event success',
  })
  @ApiCommonResponse()
  updateTime(@Body() body: { eventId: number; startTime: string; endTime: string }) {
    return this.service.updateTime({
      startTime: +body.startTime,
      endTime: +body.endTime,
      id: body.eventId,
    });
  }

  @Put('update-checklist')
  @ApiOkResponse({
    status: 200,
    description: 'update event success',
  })
  @ApiCommonResponse()
  updateCheckList(@Body() body: { eventId: number; checklist: string; templateId: number }) {
    return this.service.updateCheckList({
      id: body.eventId,
      checklist: body.checklist,
      templateId: body.templateId,
    });
  }

  @Put('update-table-count')
  @ApiOkResponse({
    status: 200,
    description: 'update event success',
  })
  @ApiCommonResponse()
  updateTableCount(@Body() body: { eventId: number; tableCount: number }) {
    return this.service.updateTableCount({
      id: body.eventId,
      tableCount: body.tableCount,
    });
  }

  @Put('update-table-size')
  @ApiOkResponse({
    status: 200,
    description: 'update event success',
  })
  @ApiCommonResponse()
  updateTableSize(@Body() body: { eventId: number; tableSize: number }) {
    return this.service.updateTableSize({
      id: body.eventId,
      tableSize: body.tableSize,
    });
  }

  @Put('feedback')
  @ApiOkResponse({
    status: 200,
    description: 'update event success',
  })
  @ApiCommonResponse()
  updateFeedback(@Body() body: { eventId: number; feedback: string }) {
    return this.service.updateFeedback({
      id: body.eventId,
      feedback: body.feedback,
    });
  }

  @Put('update-enable-chat')
  @ApiOkResponse({
    status: 200,
    description: 'update event success',
  })
  @ApiCommonResponse()
  updateEnableChat(@Body() body: { eventId: number; enableChat: boolean }) {
    return this.service.updateEnableChat({
      id: body.eventId,
      enableChat: body.enableChat,
    });
  }

  @Put('cancel')
  @ApiOkResponse({
    status: 200,
    description: 'update event success',
  })
  @ApiCommonResponse()
  cancelEvent(@Body() body: { eventId: number; isCanceled: boolean }) {
    return this.service.cancelEvent({
      id: body.eventId,
      isCanceled: body.isCanceled,
    });
  }
}
