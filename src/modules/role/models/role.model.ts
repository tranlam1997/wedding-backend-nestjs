import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { IRole } from '../interfaces/role.interface';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
})
export class Role extends Model<IRole> {
    @Column({
        type: DataType.CHAR(50),
        allowNull: false,
    })
    name: string;
}