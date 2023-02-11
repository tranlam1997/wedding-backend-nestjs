import { Column, Model, Table, DataType, PrimaryKey } from 'sequelize-typescript';
import { IPermission } from '../interfaces/permission.interface';

@Table({
  underscored: true,
  timestamps: true,
  freezeTableName: false,
})
export class Permission extends Model<IPermission> {
  @PrimaryKey
  @Column({
    type: DataType.CHAR(32),
    allowNull: false,
    unique: true
  })
  name: string;
}