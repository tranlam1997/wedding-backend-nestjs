import { ApiProperty } from '@nestjs/swagger';

export class ProvincesDto {
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
  administrativeUnit?: any;

  @ApiProperty()
  administrativeRegion?: any;
}
