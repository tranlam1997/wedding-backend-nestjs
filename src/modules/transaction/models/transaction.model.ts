import { Column, Model, Table, DataType} from 'sequelize-typescript';
import { ITransaction } from '../interfaces/transaction.interface';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  })
export class Transaction extends Model<ITransaction> {
    @Column(DataType.BIGINT)
    value: number;

    @Column(DataType.BIGINT)
    date: number;

    @Column(DataType.BOOLEAN)
    isCash: boolean;

    @Column(DataType.BOOLEAN)
    isIncome: boolean;

    @Column(DataType.CHAR(50))
    sender: string;

    @Column(DataType.CHAR(50))
    receiver: string;

    @Column(DataType.CHAR(14))
    phoneNumber: string;

    @Column(DataType.CHAR(150))
    note: string;
}