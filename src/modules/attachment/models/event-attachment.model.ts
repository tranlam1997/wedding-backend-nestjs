import { Event } from '@src/modules/event/models/event.model';
import { Model, Table, ForeignKey, Column, DataType, Index } from 'sequelize-typescript';
import { IEventAttachment } from '../../attachment/interfaces/event-attachment.interface';
import { Attachment } from './attachment.model';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  })
export class EventAttachment extends Model<IEventAttachment> {
    @ForeignKey(() => Event)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    eventId: number;

    @ForeignKey(() => Attachment)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'

    })
    attachmentId: number;
}