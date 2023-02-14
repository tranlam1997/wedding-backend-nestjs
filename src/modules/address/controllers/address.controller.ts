import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";

import { AddressService } from "../address.service";

@Controller('address')
@ApiTags('Address')
export class AddressController {
    constructor(
        private readonly service: AddressService,
    ) { }

    @Get('provinces')
    getProvinces() {
        return this.service.getProvinces();
    }

    @Get('provinces/:id/districts')
    getDistrictsOfProvince(@Param('id') provinceCode: string ) {
        return this.service.getDistrictsOfProvince(provinceCode);
    }

    @Get('districts/:id/wards')
    getWardsOfDistrict(@Param('id') districtCode: string) {
        return this.service.getWardsOfDistrict(districtCode);
    }
}