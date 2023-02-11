import { Model, Table, ForeignKey, Column, DataType, PrimaryKey } from 'sequelize-typescript';
import { ITransactionAttachment } from '../interfaces/transaction-attachment.interface';
import { Transaction } from './transaction.model';
import { Attachment } from '../../attachment/models/attachment.model';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
})
export class TransactionAttachment extends Model<ITransactionAttachment> {
    @PrimaryKey
    @ForeignKey(() => Transaction)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    transactionId: number;

    @PrimaryKey
    @ForeignKey(() => Attachment)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    attachmentId: number;
}