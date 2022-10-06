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
    province?: any;

    @ApiProperty()
    district?: any;

    @ApiProperty()
    ward?: any;

    @ApiProperty()
    avatar: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

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
}