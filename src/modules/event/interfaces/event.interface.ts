export interface IEvent {
    id: number;
    title: string;
    titleEn: string;
    guestEstimate: string;
    tableCount: number;
    tableSize: number;
    feedback: string;
    startTime: number;
    endTime: number;
    typeId: number;
    placeId: number;
    placeNote: string;
    backupPlaceId: number;
    deposit: number;
    depositNote: string;
    isCanceled: boolean;
    checklist: string;
    customerId: number;
    userId: number;
    user?: any;
    customer?: any;
    enableChat: boolean;
    dateTime: string;
}