import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@src/base/base.repository";
import { DataSource } from "typeorm";
import { District } from "../entities/districts.entity";

@Injectable()
export class DistrictsRepository extends BaseRepository<District> {
    constructor(dataSource: DataSource) {
        super(dataSource, District);
    }
}