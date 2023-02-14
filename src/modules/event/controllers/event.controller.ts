import { Controller, Get, Param, Query, Post, Body, Request, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { EventService } from '../services/event.service';
import { Delete } from '@nestjs/common/decorators';

@Controller('events')
@ApiTags('Event')
export class EventController {
  constructor(private readonly service: EventService) {}

  @Get()
  getProvinces() {
    return this.service.getEvents();
  }

  @Get('schedule')
  getSchedule(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.service.getSchedule({ startDate, endDate });
  }

  @Get('by-month')
  getEventByMonth(@Query('year') year: string, @Query('month') month: string) {
    return this.service.getEventByMonth({ year, month });
  }

  @Get('by-day')
  getEventByDay(
    @Query('year') year: string,
    @Query('month') month: string,
    @Query('day') day: string,
  ) {
    return this.service.getEventByDay({ year, month, day });
  }

  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.service.getEventById(id);
  }

  @Post()
  createEvent(@Body() body: any, @Request() req: any) {
    return this.service.createEvent(body, req.user.id);
  }

  @Put()
  updateEvent(@Body() body: any, @Request() req: any) {
    return this.service.updateEvent(body, req.user.id);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.service.deleteEventById(+id);
  }

  @Put('update-customer')
  updateCustomer(@Body() body: { eventId: number; customerId: number }) {
    return this.service.updateCustomer({
      id: body.eventId,
      customerId: body.customerId,
    });
  }

  @Put('update-title')
  updateTitle(@Body() body: { eventId: number; title: string }) {
    return this.service.updateTitle({
      id: body.eventId,
      title: body.title,
    });
  }

  @Put('update-attachment')
  updateAttachment(@Body() body: { eventId: number; attachments: any }) {
    return this.service.updateAttachment({
      id: body.eventId,
      attachments: body.attachments,
    });
  }

  @Put('update-guest-estimate')
  updateGuestEstimate(@Body() body: { eventId: number; guestEstimate: string }) {
    return this.service.updateGuestEstimate({
      id: body.eventId,
      guestEstimate: body.guestEstimate,
    });
  }

  @Put('update-place-and-time')
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
  updateTime(@Body() body: { eventId: number; startTime: string; endTime: string }) {
    return this.service.updateTime({
      startTime: +body.startTime,
      endTime: +body.endTime,
      id: body.eventId,
    });
  }

  @Put('update-checklist')
  updateCheckList(@Body() body: { eventId: number; checklist: string; templateId: number }) {
    return this.service.updateCheckList({
      id: body.eventId,
      checklist: body.checklist,
      templateId: body.templateId,
    });
  }

  @Put('update-table-count')
  updateTableCount(@Body() body: { eventId: number; tableCount: number }) {
    return this.service.updateTableCount({
      id: body.eventId,
      tableCount: body.tableCount,
    });
  }

  @Put('update-table-size')
  updateTableSize(@Body() body: { eventId: number; tableSize: number }) {
    return this.service.updateTableSize({
      id: body.eventId,
      tableSize: body.tableSize,
    });
  }

  @Put('feedback')
  updateFeedback(@Body() body: { eventId: number; feedback: string }) {
    return this.service.updateFeedback({
      id: body.eventId,
      feedback: body.feedback,
    });
  }

  @Put('update-enable-chat')
  updateEnableChat(@Body() body: { eventId: number; enableChat: boolean }) {
    return this.service.updateEnableChat({
      id: body.eventId,
      enableChat: body.enableChat,
    });
  }

  @Put('cancel')
  cancelEvent(@Body() body: { eventId: number; isCanceled: boolean }) {
    return this.service.cancelEvent({
      id: body.eventId,
      isCanceled: body.isCanceled,
    });
  }
}
