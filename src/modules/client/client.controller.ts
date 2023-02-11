import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiCommonResponse } from "@src/decorators/api-common-response.decorator";
import { ClientService } from "./client.service";

@Controller('client')
@ApiTags('Client')
export class ClientController {
    constructor(
        private readonly service: ClientService,
    ) { }

    @Get()
    @ApiOkResponse({
        status: 200,
        description: 'Get client success',
    })
    @ApiCommonResponse()
    getClient() {
        return this.service.getClients();
    }

    @Put()
    @ApiOkResponse({
        status: 200,
        description: 'Update client success',
    })
    @ApiCommonResponse()
    updateClient(@Body() body: any) {
        return this.service.updateClient(body);
    }
}