import { Place } from '@src/modules/address/models/place.model';
import { Model, Table, ForeignKey, Column, DataType, PrimaryKey } from 'sequelize-typescript';
import { IPlaceAttachment } from '../../attachment/interfaces/place-attachment.interface';
import { Attachment } from './attachment.model';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
})
export class PlaceAttachment extends Model<IPlaceAttachment> {
    @ForeignKey(() => Place)
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    placeId: number;

    @ForeignKey(() => Attachment)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    attachmentId: number;
}