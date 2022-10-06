export interface ICustomer {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    delegatePerson: string;
    delegateMobile: string;
    address: string;
    province?: any;
    district?: any;
    ward?: any;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
    provider: string;
    providerId: string;
    company: string;
    note: string;
}