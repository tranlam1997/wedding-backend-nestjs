import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AdministrativeRegion } from './models/administrative-region.model';
import { AdministrativeUnit } from './models/administrative-unit.model';
import { District } from './models/district.model';
import { Province } from './models/province.model';
import { Ward } from './models/ward.model';
import { Place } from './models/place.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Province,
      Place,
      District,
      Ward,
      AdministrativeRegion,
      AdministrativeUnit
    ]),
  ],
  controllers: [AddressController],
  providers: [
    AddressService,
  ],
  exports: [AddressService],
})
export class AddressModule { }
