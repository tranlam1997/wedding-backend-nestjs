import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiCommonResponse } from "@src/decorators/api-common-response.decorator";

@Controller('role')
@ApiTags('Role')
export class RoleController {
    constructor(
    ) { }

    @Get()
    getHello(): string {
      return 'hello world'
    }
}