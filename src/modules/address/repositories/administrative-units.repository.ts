import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@src/base/base.repository";
import { DataSource } from "typeorm";
import { AdministrativeUnit } from "../entities/administrative-units.entity";

@Injectable()
export class AdministrativeUnitsRepository extends BaseRepository<AdministrativeUnit> {
    constructor(dataSource: DataSource) {
        super(dataSource, AdministrativeUnit);
    }
}