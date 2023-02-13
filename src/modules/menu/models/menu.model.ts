import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { IMenu } from '../interfaces/menu.interface';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  })
export class Menu extends Model<IMenu> {
    @Column({
        type: DataType.CHAR(100),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.CHAR(100),
        allowNull: true,
    })
    amount: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    price: number;
}