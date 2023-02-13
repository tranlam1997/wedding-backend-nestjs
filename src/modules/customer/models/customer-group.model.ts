import { Column, Model, Table, DataType, Index } from 'sequelize-typescript';
import { ICustomerGroup } from '../interfaces/customer-group.interface';

@Table({
    underscored: true,
    timestamps: true,
    freezeTableName: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  })
export class CustomerGroup extends Model<ICustomerGroup> {
    @Column({
        type: DataType.CHAR(50),
        allowNull: false,
    })
    name: string;
}