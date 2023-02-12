import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { AddressService } from '../address.service';

@Controller('places')
@ApiTags('Place')
export class PlaceController {
  constructor(private readonly service: AddressService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'Get all provinces success',
  })
  @ApiCommonResponse()
  getPlaces() {
    return this.service.getPlaces();
  }

  @Post()
  @ApiOkResponse({
    status: 200,
    description: 'Get all districts of a province success',
  })
  @ApiCommonResponse()
  createPlace(@Body() body: { name: string; settings: string }) {
    return this.service.createPlace({ ...body });
  }

  @Put(':id/update-settings')
  @ApiParam({
    name: 'id',
    description: 'place id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get all wards of a district success',
  })
  @ApiCommonResponse()
  updateSettingsById(@Body() body: { settings: string }, @Param('id') id: string) {
    return this.service.updateSettingsById({
      placeId: +id,
      ...body,
    });
  }

  @Post('delete-multi')
  @ApiOkResponse({
    status: 200,
    description: 'Get all wards of a district success',
  })
  @ApiCommonResponse()
  deleteMultiPlaces(@Body() body: { placeIds: number[] }) {
    return this.service.deleteMultiPlaces(body.placeIds);
  }

  @Put(':id/change-name')
  @ApiParam({
    name: 'id',
    description: 'place id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Get all wards of a district success',
  })
  @ApiCommonResponse()
  updateNameById(@Body() body: { name: string }, @Param('id') id: string) {
    return this.service.updateNameById({
      placeId: +id,
      ...body,
    });
  }

  @Put('update-attachment')
  @ApiOkResponse({
    status: 200,
    description: 'Get all wards of a district success',
  })
  @ApiCommonResponse()
  updateAttachmentsById(@Body() body: { placeId: number; attachments: number[] }) {
    return this.service.updateAttachmentsById({
      placeId: body.placeId,
      ...body,
    });
  }
}
