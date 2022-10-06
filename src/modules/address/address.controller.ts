import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiCommonResponse } from "@src/decorators/api-common-response.decorator";
import { AddressService } from "./address.service";

@Controller('address')
@ApiTags('Address')
export class AddressController {
    constructor(
        private readonly service: AddressService,
    ) {}

    @Get('provinces')
    @ApiOkResponse({
        status: 200,
        description: 'Get all provinces success',
      })
    @ApiCommonResponse()
    getProvinces() {
        return this.service.getProvinces();
    }

    @Get('provinces/:id/districts')
    @ApiParam({
        name: 'id',
        description: 'Province code',

    })
    @ApiOkResponse({
        status: 200,
        description: 'Get all districts of a province success',
        })
    @ApiCommonResponse()
    getDistrictsOfProvince(@Param('id') provinceCode: string) {
        return this.service.getDistrictsOfProvince(provinceCode);
    }

    @Get('districts/:id/wards')
    @ApiParam({
        name: 'id',
        description: 'District code',
    })
    @ApiOkResponse({
        status: 200,
        description: 'Get all wards of a district success',
    })
    @ApiCommonResponse()
    getWardsOfDistrict(@Param('id') districtCode: string) {
        return this.service.getWardsOfDistrict(districtCode);
    }
}