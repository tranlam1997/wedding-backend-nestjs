import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";

import { AttachmentService } from "./attachment.service";

@Controller('attachments')
@ApiTags('Attachment')
export class AttachmentController {
    constructor(
        private readonly service: AttachmentService,
    ) { }

    @Get('event/:id')
    getEventAttachmentById(@Param('id') id: number) {
        return this.service.getEventAttachmentById(id);
    }

    @Get('place/:id')
    getPlaceAttachmentById(@Param('id') id: number) {
        return this.service.getPlaceAttachmentById(id);
    }
}