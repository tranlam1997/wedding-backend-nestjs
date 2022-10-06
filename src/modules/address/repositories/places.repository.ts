import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@src/base/base.repository";
import { DataSource } from "typeorm";
import { Place } from "../entities/places.entity";

@Injectable()
export class PlacesRepository extends BaseRepository<Place> {
    constructor(dataSource: DataSource) {
        super(dataSource, Place);
    }
}