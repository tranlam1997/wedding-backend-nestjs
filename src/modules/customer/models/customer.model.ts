import { District } from '@src/modules/address/models/district.model';
import { Province } from '@src/modules/address/models/province.model';
import { Ward } from '@src/modules/address/models/ward.model';
import { DataType, Model, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ICustomer } from '../interfaces/customer.interface';
import { CustomerGroup } from './customer-group.model';

@Table({
  underscored: true,
  timestamps: true,
  freezeTableName: false,
})
export class Customer extends Model<ICustomer> {
  @Column(DataType.CHAR(50))
  name: string;

  @Column({
    type: DataType.CHAR(20),
    allowNull: true,
    field: 'tel',
  })
  phoneNumber: string;

  @Column({
    type: DataType.CHAR(20),
    allowNull: true,
    field: 'addr',
  })
  address: string;

  @ForeignKey(() => Province)
  @Column({
    type: DataType.CHAR(20),
    allowNull: true,
    field: 'province_code',
  })
  provinceCode: string;

  @BelongsTo(() => Province)
  province: Province;

  @ForeignKey(() => District)
  @Column({
    type: DataType.CHAR(20),
    allowNull: true,
    field: 'district_code',
  })
  districtCode: string;

  @BelongsTo(() => District)
  district: District;

  @ForeignKey(() => Ward)
  @Column({
    type: DataType.CHAR(20),
    allowNull: true,
    field: 'ward_code',
  })
  wardCode: string;

  @BelongsTo(() => Ward)
  ward: Ward;

  @Column({
    type: DataType.CHAR(128),
    allowNull: true,
  })
  photoUrl: string;

  @Column({
    type: DataType.CHAR(128),
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.CHAR(50),
    allowNull: true,
  })
  delegatePerson: string;

  @Column({
    type: DataType.CHAR(20),
    allowNull: true,
  })
  delegateMobile: string;

  @Column({
    type: DataType.CHAR(100),
    allowNull: true,
  })
  company: string;

  @Column({
    type: DataType.CHAR(150),
    allowNull: true,
  })
  note: string;

  @ForeignKey(() => CustomerGroup)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  groupId: number;

  @BelongsTo(() => CustomerGroup)
  group: CustomerGroup;
}
