import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";


@Controller('images')
@ApiTags('Image')
export class ImageController {
    constructor(
    ) { }

    @Get()
    getHello(): string {
      return 'Not implemented'
    }
}