import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BaseRepository, ModelType } from "@src/base/base.repository";
import { IAdministrativeRegion } from "../interfaces/administrative-region.interface";
import { AdministrativeRegion } from "../models/administrative-region.model";

@Injectable()
export class AdministrativeRegionsRepository extends BaseRepository<IAdministrativeRegion, AdministrativeRegion> {
    constructor(@InjectModel(AdministrativeRegion) model: ModelType<IAdministrativeRegion,AdministrativeRegion>) {
        super(model);
    }
}