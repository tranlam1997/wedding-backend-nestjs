import { Body, Controller, Get, Param, Request, Put, Post } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { UserService } from '../user/user.service';

@Controller('')
@ApiTags('Public')
export class PublicApiController {
    constructor(private readonly service: UserService) { }

    @Post('create-user')
    @ApiOkResponse({
        status: 200,
        description: 'Get all users success',
    })
    @ApiCommonResponse()
    createUser(
        @Body()
        body: {
            email: string;
            password: string;
            phoneNumber: string;
            displayName: string;
            roleId: number;
        },
    ) {
        return this.service.createUser({
            ...body,
        });
    }
}
