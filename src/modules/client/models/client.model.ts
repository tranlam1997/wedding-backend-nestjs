import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { IClient } from '../interfaces/client.interface';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  })
export class Client extends Model<IClient> {
    @Column({
        type: DataType.CHAR(21),
        allowNull: true,
    })
    version: string;

    @Column({
        type: DataType.CHAR(20),
        allowNull: true,
    })
    type: string;

    @Column({
        type: DataType.CHAR(50),
        allowNull: true,
    })
    value: string;
}