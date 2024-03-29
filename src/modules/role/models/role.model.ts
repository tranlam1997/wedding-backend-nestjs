import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { IRole } from '../interfaces/role.interface';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  })
export class Role extends Model<IRole> {
    @Column({
        type: DataType.CHAR(50),
        allowNull: false,
    })
    name: string;
}