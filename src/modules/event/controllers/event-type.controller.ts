import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiCommonResponse } from "@src/decorators/api-common-response.decorator";
import { EventTypeService } from "../services/event-type.service";

@Controller('event-types')
@ApiTags('Event Type')
export class EventTypeController {
    constructor(
        private readonly service: EventTypeService,
    ) { }

    @Get()
    @ApiOkResponse({
        status: 200,
        description: 'Get all provinces success',
    })
    @ApiCommonResponse()
    getEventType() {
        return this.service.getEventType();
    }

    @Post()
    @ApiOkResponse({
        status: 200,
        description: 'Get all provinces success',
    })
    @ApiCommonResponse()
    createEventType(@Body() body: {name: string; color: string}) {
        return this.service.createEventType(body);
    }

    @Put(':id/template')
    @ApiParam({
        name: 'id',
        description: 'Event type id',
    })
    @ApiOkResponse({
        status: 200,
        description: 'Get all provinces success',
    })
    @ApiCommonResponse()
    updateEventTypeTemplateById(@Body() body: {template: any}, @Param('id') id: string) {
        return this.service.updateEventTypeTemplateById({
            eventTypeId: +id,
            template: body.template,
        });
    }

    @Put(':id/template/change-name-and-color')
    @ApiParam({
        name: 'id',
        description: 'Event type id',
    })
    @ApiOkResponse({
        status: 200,
        description: 'Get all provinces success',
    })
    @ApiCommonResponse()
    updateEventTypeNameAndColorById(@Body() body: {name: string; color: string}, @Param('id') id: string) {
        return this.service.updateEventTypeNameAndColorById({
            evenTypeId: +id,
            name: body.name,
            color: body.color,
        });
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        description: 'Event type id',
    })
    @ApiOkResponse({
        status: 200,
        description: 'Get all provinces success',
    })
    @ApiCommonResponse()
    deleteEventTypeById( @Param('id') id: string) {
        return this.service.deleteEventTypeById(+id);
    }

    @Post('delete-multi')
    @ApiOkResponse({
        status: 200,
        description: 'Get all provinces success',
    })
    @ApiCommonResponse()
    deleteMultiEventType( @Body() body: {ids: number[]}){
        return this.service.deleteMultiEventType(body.ids);
    }
}