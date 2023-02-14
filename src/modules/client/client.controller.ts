import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";

import { ClientService } from "./client.service";

@Controller('client')
@ApiTags('Client')
export class ClientController {
    constructor(
        private readonly service: ClientService,
    ) { }

    @Get()
    getClient() {
        return this.service.getClients();
    }

    @Put()
    updateClient(@Body() body: any) {
        return this.service.updateClient(body);
    }
}