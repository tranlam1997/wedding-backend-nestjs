import { Column, Model, Table, DataType, ForeignKey, BelongsTo, Index } from 'sequelize-typescript';
import { IMessageAttachment } from '../interfaces/message-attachment.interface';
import { Attachment } from './attachment.model';
import { Message } from '@src/modules/message/models/message.model';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
})
export class MessageAttachment extends Model<IMessageAttachment> {
    @ForeignKey(() => Message)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    messageId: number;

    @ForeignKey(() => Attachment)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    attachmentId: number;
}