export interface ITransaction {
    id: number;
    value: number;
    date: number,
    isCash: boolean,
    isIncome: boolean,
    sender: string,
    receiver: string,
    phoneNumber: string,
    note: string,
}