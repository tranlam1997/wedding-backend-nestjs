export interface IMessage {
    id: number;
    parentId: number;
    userId: number;
    roomId: number;
    time: number;
    content: string;
    likes: string;
    dateTime: string;
    chatRoom?: any;
    user?: any;
}