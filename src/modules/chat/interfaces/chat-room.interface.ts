export interface IChatRoom {
    id: number;
    name: string;
    photoId: string;
    backgroundId: string;
    type: string;
    description: string;
    extra: string;
    creatorId: number;
    user?: any;
}