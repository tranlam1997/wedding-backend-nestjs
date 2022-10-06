import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@src/base/base.repository";
import { DataSource } from "typeorm";
import { Ward } from "../entities/wards.entity";

@Injectable()
export class WardsRepository extends BaseRepository<Ward> {
    constructor(dataSource: DataSource) {
        super(dataSource, Ward);
    }
}