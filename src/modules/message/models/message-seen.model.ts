import { Column, Model, Table, DataType, ForeignKey, BelongsTo, Index } from 'sequelize-typescript';
import { IMessage } from '../interfaces/message.interface';
import { User } from '../../user/models/user.model';
import { ChatRoom } from '../../chat/models/chat-room.model';
import { IMessageSeen } from '../interfaces/message-seen.interface';
import { Message } from './message.model';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
})
export class MessageSeen extends Model<IMessageSeen> {
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
    room: ChatRoom;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    time: string;

    @ForeignKey(() => Message)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    lastSeenId: number;

    @BelongsTo(() => Message)
    message: Message;

    @Column({
        type: DataType.CHAR(20),
        allowNull: true,
    })
    dateTime: string;
}