import { Injectable } from "@nestjs/common";
import { DistrictsRepository } from "./repositories/districts.repository";
import { PlacesRepository } from "./repositories/places.repository";
import { ProvincesRepository } from "./repositories/provinces.repository";
import { WardsRepository } from "./repositories/wards.repository";

@Injectable()
export class AddressService {
    constructor(
        private readonly provincesRepo: ProvincesRepository,
        private readonly districtsRepo: DistrictsRepository,
        private readonly wardsRepo: WardsRepository,
        private readonly placesRepo: PlacesRepository,
    ) {}

    async getProvinces() {
        return await this.provincesRepo.find({});
    }

    async getDistrictsOfProvince(provinceCode: string) {
        return await this.districtsRepo.find({
            where: {
                provinceCode,
            },
        });
    }

    async getWardsOfDistrict(districtCode: string) {
        return await this.wardsRepo.find({
            where: {
                districtCode,
            },
        });
    }
}