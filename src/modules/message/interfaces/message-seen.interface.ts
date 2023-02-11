export interface IMessageSeen {
    id: number;
    userId: number;
    roomId: number;
    lastSeenId: number;
    time: number;
    dateTime: string;
    user?: any;
    chatRoom?: any;
    message?: any;
}