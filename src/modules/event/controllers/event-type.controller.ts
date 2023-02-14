import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";

import { EventTypeService } from "../services/event-type.service";

@Controller('event-types')
@ApiTags('Event Type')
export class EventTypeController {
    constructor(
        private readonly service: EventTypeService,
    ) { }

    @Get()
    getEventType() {
        return this.service.getEventType();
    }

    @Post()
    createEventType(@Body() body: {name: string; color: string}) {
        return this.service.createEventType(body);
    }

    @Put(':id/template')
    updateEventTypeTemplateById(@Body() body: {template: any}, @Param('id') id: string) {
        return this.service.updateEventTypeTemplateById({
            eventTypeId: +id,
            template: body.template,
        });
    }

    @Put(':id/template/change-name-and-color')
    updateEventTypeNameAndColorById(@Body() body: {name: string; color: string}, @Param('id') id: string) {
        return this.service.updateEventTypeNameAndColorById({
            evenTypeId: +id,
            name: body.name,
            color: body.color,
        });
    }

    @Delete(':id')
    deleteEventTypeById( @Param('id') id: string) {
        return this.service.deleteEventTypeById(+id);
    }

    @Post('delete-multi')
    deleteMultiEventType( @Body() body: {ids: number[]}){
        return this.service.deleteMultiEventType(body.ids);
    }
}