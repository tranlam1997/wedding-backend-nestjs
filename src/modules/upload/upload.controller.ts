import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";


@Controller('upload')
@ApiTags('Upload')
export class UploadController {
    constructor(
    ) { }

    @Get()
    getHello(): string {
      return 'Not implemented'
    }
}