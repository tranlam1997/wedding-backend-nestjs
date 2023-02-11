import { Column, Model, Table, DataType, ForeignKey, BelongsTo, Index } from 'sequelize-typescript';
import { IMessage } from '../interfaces/message.interface';
import { User } from '../../user/models/user.model';
import { ChatRoom } from '../../chat/models/chat-room.model';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
})
export class Message extends Model<IMessage> {
    @Column(DataType.INTEGER)
    parentId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => ChatRoom)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    roomId: number;

    @BelongsTo(() => ChatRoom)
    chatRoom: ChatRoom;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    time: number;

    @Column({
        type: DataType.STRING(200),
        allowNull: true,
    })
    content: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: true,
    })
    likes: string;

    @Column({
        type: DataType.CHAR(20),
        allowNull: true,
    })
    dateTime: string;
}