import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { District } from "./models/district.model";
import { DistrictsRepository } from "./repositories/districts.repository";
import { PlacesRepository } from "./repositories/places.repository";
import { ProvincesRepository } from "./repositories/provinces.repository";
import { WardsRepository } from "./repositories/wards.repository";
import sequelize from 'sequelize';
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class AddressService {
    constructor(
        private readonly provincesRepo: ProvincesRepository,
        private readonly districtsRepo: DistrictsRepository,
        private readonly wardsRepo: WardsRepository,
        private readonly placesRepo: PlacesRepository,
        private sequelize: Sequelize
        
    ) {}

    async getProvinces() {
        return this.sequelize.query<{
            name: string,
        }>('SELECT * FROM "Provinces"', {type: sequelize.QueryTypes.SELECT})
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