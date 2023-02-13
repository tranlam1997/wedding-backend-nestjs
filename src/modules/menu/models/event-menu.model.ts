import { Event } from '@src/modules/event/models/event.model';
import { Column, DataType, ForeignKey, Index, Model, Table } from 'sequelize-typescript';
import { IEventMenu } from '../interfaces/event-menu.interface';
import { Menu } from './menu.model';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
})
export class EventMenu extends Model<IEventMenu> {
    @ForeignKey(() => Event)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    eventId: number;

    @ForeignKey(() => Menu)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    menuId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    price: number;

    @Column({
        type: DataType.CHAR(100),
        allowNull: true,
    })
    amount: number;
}