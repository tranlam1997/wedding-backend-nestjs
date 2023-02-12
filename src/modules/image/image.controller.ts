import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiCommonResponse } from "@src/decorators/api-common-response.decorator";

@Controller('images')
@ApiTags('Image')
export class ImageController {
    constructor(
    ) { }

    @Get()
    @ApiOkResponse({
        status: 200,
        description: 'Success'
    })
    @ApiCommonResponse()
    getHello(): string {
      return 'Not implemented'
    }
}