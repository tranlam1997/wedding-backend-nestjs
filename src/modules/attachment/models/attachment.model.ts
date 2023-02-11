import { User } from '@src/modules/user/models/user.model';
import { Table, Model, ForeignKey, DataType, Column, BelongsTo, Index } from 'sequelize-typescript';
import { IAttachment } from "../interfaces/attachment.interface";

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
})
export class Attachment extends Model<IAttachment> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.CHAR(100),
        allowNull: false,
    })
    filename: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    size: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    width: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    height: number;

    @Column({
        type: DataType.CHAR(20),
        allowNull: true,
    })
    type: string;

    @Column({
        type: DataType.CHAR(21),
        allowNull: false,
    })
    previewId: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    time: number;
}