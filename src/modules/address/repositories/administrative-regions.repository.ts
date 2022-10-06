import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@src/base/base.repository";
import { DataSource } from "typeorm";
import { AdministrativeRegion } from "../entities/administrative-regions.entity";

@Injectable()
export class AdministrativeRegionsRepository extends BaseRepository<AdministrativeRegion> {
    constructor(dataSource: DataSource) {
        super(dataSource, AdministrativeRegion);
    }
}