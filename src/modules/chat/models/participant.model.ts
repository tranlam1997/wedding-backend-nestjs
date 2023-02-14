import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { IParticipant } from '../interfaces/participant.interface';
import { User } from '../../user/models/user.model';
import { ChatRoom } from './chat-room.model';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  })
export class Participant extends Model<IParticipant> {
    @PrimaryKey
    @Column({
        type: DataType.STRING(100),
    })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        unique: 'userId_roomId'
    })
    userId: number;

    @ForeignKey(() => ChatRoom)
    @Column({
        type: DataType.STRING(100),
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        unique: 'userId_roomId'
    })
    roomId: string;

    @Column({
        type: DataType.BIGINT,
    })
    time: number;
}