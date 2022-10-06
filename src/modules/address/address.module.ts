import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AdministrativeRegion } from './entities/administrative-regions.entity';
import { AdministrativeUnit } from './entities/administrative-units.entity';
import { District } from './entities/districts.entity';
import { Province } from './entities/provinces.entity';
import { Ward } from './entities/wards.entity';
import { AdministrativeRegionsRepository } from './repositories/administrative-regions.repository';
import { AdministrativeUnitsRepository } from './repositories/administrative-units.repository';
import { DistrictsRepository } from './repositories/districts.repository';
import { PlacesRepository } from './repositories/places.repository';
import { ProvincesRepository } from './repositories/provinces.repository';
import { WardsRepository } from './repositories/wards.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Province, District, Ward, AdministrativeRegion, AdministrativeUnit]),
  ],
  controllers: [AddressController],
  providers: [
    AddressService,
    ProvincesRepository,
    AdministrativeUnitsRepository,
    AdministrativeRegionsRepository,
    WardsRepository,
    DistrictsRepository,
    PlacesRepository,
  ],
  exports: [AddressService],
})
export class AddressModule {}
