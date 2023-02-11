export interface IAttachment {
    id: number;
    userId: number;
    filename: string;
    size: number;
    width: number;
    height: number;
    type: string;
    previewId: string;
    time: number;
    user?: any;
}