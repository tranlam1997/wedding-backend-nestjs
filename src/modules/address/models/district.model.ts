import { Column, DataType, Model, PrimaryKey, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { IDistrict } from '../interfaces/district.interface';
import { AdministrativeUnit } from "./administrative-unit.model";
import { Province } from "./province.model";

@Table({
  underscored: true,
  timestamps: true,
  freezeTableName: false,
})
export class District extends Model<IDistrict> {
  @PrimaryKey
  @Column(DataType.CHAR(20))
  code: string;

  @Column(DataType.CHAR(255))
  name: string;


  @Column({
    type: DataType.CHAR(255),
    allowNull: true,
  })
  nameEn: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: true,
  })
  fullName: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: true,
  })
  fullNameEn: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: true,
  })
  codeName: string;

  @ForeignKey(() => Province)
  @Column
  provinceCode: string;

  @ForeignKey(() => AdministrativeUnit)
  @Column
  administrativeUnitId: number;

  @BelongsTo(() => Province)
  province: Province;

  @BelongsTo(() => AdministrativeUnit)
  administrativeUnit: AdministrativeUnit;
}