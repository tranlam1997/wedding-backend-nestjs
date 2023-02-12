import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiCommonResponse } from "@src/decorators/api-common-response.decorator";

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(
    ) { }

    @Get()
    getHello(): string {
      return 'hello world'
    }
}