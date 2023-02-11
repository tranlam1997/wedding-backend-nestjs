export interface IUser {
    id: number;
    displayName: string;
    password: string;
    photoUrl: string;
    photoId: string;
    backgroundId: string;
    uid: string;
    email: string;
    tel: string;
    provider: string;
    providerId: string;
    emailVerified: boolean;
    roleId: number;
    active: boolean;
    clientVerison: string;
    clientType: string;
    role: any;
}