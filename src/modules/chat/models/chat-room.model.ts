import { Column, Model, Table, DataType, ForeignKey, HasMany } from 'sequelize-typescript';
import { IChatRoom } from '../interfaces/chat-room.interface';
import { User } from '../../user/models/user.model';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  })
export class ChatRoom extends Model<IChatRoom> {
    @Column(DataType.CHAR(100))
    name: string;

    @Column(DataType.CHAR(100))
    photoId: string;

    @Column(DataType.CHAR(100))
    backgroundId: string;

    @Column(DataType.CHAR(100))
    type: string;

    @Column(DataType.CHAR(100))
    description: string;

    @Column(DataType.CHAR(100))
    extra: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    userId: number;
}