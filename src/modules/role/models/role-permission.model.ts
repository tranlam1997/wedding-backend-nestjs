import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { IRolePermission } from '../interfaces/role-permission.interface';
import { Permission } from './permission.model';
import { Role } from './role.model';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
})
export class RolePermission extends Model<IRolePermission> {
    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    roleId: number;

    @ForeignKey(() => Permission)
    @Column({
        type: DataType.CHAR(32),
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    permissionName: string;
}