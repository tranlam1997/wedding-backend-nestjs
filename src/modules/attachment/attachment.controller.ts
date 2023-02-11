import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiCommonResponse } from "@src/decorators/api-common-response.decorator";
import { AttachmentService } from "./attachment.service";

@Controller('attachments')
@ApiTags('Attachment')
export class AttachmentController {
    constructor(
        private readonly service: AttachmentService,
    ) { }

    @Get('event/:id')
    @ApiParam({
        name: 'id',
        description: 'event attachment id',
    })
    @ApiOkResponse({
        status: 200,
        description: 'Get event attachment by id',
    })
    @ApiCommonResponse()
    getEventAttachmentById(@Param('id') id: number) {
        return this.service.getEventAttachmentById(id);
    }

    @Get('place/:id')
    @ApiParam({
        name: 'id',
        description: 'place attachment id',
    })
    @ApiOkResponse({
        status: 200,
        description: 'Get place attachment by id',
    })
    @ApiCommonResponse()
    getPlaceAttachmentById(@Param('id') id: number) {
        return this.service.getPlaceAttachmentById(id);
    }
}