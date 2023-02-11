import { ApiProperty } from "@nestjs/swagger";

export class CustomerDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    delegatePerson: string;

    @ApiProperty()
    delegateMobile: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    provinceCode: string;

    @ApiProperty()
    districtCode: string;

    @ApiProperty()
    wardCode: string;

    @ApiProperty()
    photoUrl: string;

    @ApiProperty()
    emailVerified: boolean;

    @ApiProperty()
    provider: string;

    @ApiProperty()
    providerId: string;

    @ApiProperty()
    company: string;

    @ApiProperty()
    note: string;

    @ApiProperty()
    groupId: number;
}