import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import sequelize from 'sequelize';
import { Sequelize } from "sequelize-typescript";
import { District } from './models/district.model';
import { Province } from './models/province.model';
import { Ward } from './models/ward.model';

@Injectable()
export class AddressService {
    constructor(
        private sequelize: Sequelize,
        @InjectModel(District) private districtModel: typeof District,
        @InjectModel(Ward) private wardModel: typeof Ward,
    ) { }

    async getProvinces() {
        return this.sequelize.query<Province>('SELECT * FROM "Provinces"', { type: sequelize.QueryTypes.SELECT })
    }

    async getDistrictsOfProvince(provinceCode: string) {
        return await this.districtModel.findAll({
            where: {
                provinceCode
            }
        });
    }

    async getWardsOfDistrict(districtCode: string) {
        return await this.wardModel.findAll({
            where: {
                districtCode,
            },
        });
    }
}