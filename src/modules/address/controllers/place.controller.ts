import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AddressService } from '../address.service';

@Controller('places')
@ApiTags('Place')
export class PlaceController {
  constructor(private readonly service: AddressService) {}

  @Get()
  getPlaces() {
    return this.service.getPlaces();
  }

  @Post()
  createPlace(@Body() body: { name: string; settings: string }) {
    return this.service.createPlace({ ...body });
  }

  @Put(':id/update-settings')
  updateSettingsById(@Body() body: { settings: string }, @Param('id') id: string) {
    return this.service.updateSettingsById({
      placeId: +id,
      ...body,
    });
  }

  @Post('delete-multi')
  deleteMultiPlaces(@Body() body: { placeIds: number[] }) {
    return this.service.deleteMultiPlaces(body.placeIds);
  }

  @Put(':id/change-name')
  updateNameById(@Body() body: { name: string }, @Param('id') id: string) {
    return this.service.updateNameById({
      placeId: +id,
      ...body,
    });
  }

  @Put('update-attachment')
  updateAttachmentsById(@Body() body: { placeId: number; attachments: number[] }) {
    return this.service.updateAttachmentsById({
      placeId: body.placeId,
      ...body,
    });
  }
}
