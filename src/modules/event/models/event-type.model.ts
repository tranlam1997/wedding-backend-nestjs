import { Column, Table, Model, DataType } from 'sequelize-typescript';
import { IEventType } from '../interfaces/event-type.interface';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
})
export class EventType extends Model<IEventType> {
    @Column({
        type: DataType.CHAR(50),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.CHAR(10),
        allowNull: true,
    })
    color: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    template: string;
}