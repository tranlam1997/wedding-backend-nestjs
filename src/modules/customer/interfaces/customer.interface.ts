export interface ICustomer {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    delegatePerson: string;
    delegateMobile: string;
    address: string;
    province?: any;
    provinceCode: string;
    district?: any;
    districtCode: string;
    ward?: any;
    wardCode: string;
    photoUrl: string;
    emailVerified: boolean;
    company: string;
    note: string;
}