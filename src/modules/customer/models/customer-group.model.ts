import { Column, Model, Table, DataType, Index } from 'sequelize-typescript';
import { ICustomerGroup } from '../interfaces/customer-group.interface';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
})
export class CustomerGroup extends Model<ICustomerGroup> {
    @Column({
        type: DataType.CHAR(50),
        allowNull: false,
    })
    name: string;
}