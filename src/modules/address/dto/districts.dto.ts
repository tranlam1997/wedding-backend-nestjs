import { ApiProperty } from '@nestjs/swagger';

// convert to api property from district.entity.ts file
export class DistrictsDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  fullNameEn: string;

  @ApiProperty()
  codeName: string;

  @ApiProperty()
  province?: any;

  @ApiProperty()
  administrativeUnit?: any;
}
