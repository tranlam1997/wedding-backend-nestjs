import { Event } from '@src/modules/event/models/event.model';
import { Model, Table, ForeignKey, Column, DataType, PrimaryKey } from 'sequelize-typescript';
import { IEventTransaction } from '../interfaces/event-transaction.interface';
import { Transaction } from './transaction.model';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  })
export class EventTransaction extends Model<IEventTransaction> {
    @PrimaryKey
    @ForeignKey(() => Event)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    eventId: number;

    @PrimaryKey
    @ForeignKey(() => Transaction)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    transactionId: number;
}