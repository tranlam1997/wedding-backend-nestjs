import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@src/base/base.repository";
import { DataSource } from "typeorm";
import { Province } from "../entities/provinces.entity";

@Injectable()
export class ProvincesRepository extends BaseRepository<Province> {
    constructor(dataSource: DataSource) {
        super(dataSource, Province);
    }
}