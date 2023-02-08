import { Customer } from "@src/modules/customers/customers.model";
import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IWard } from "../interfaces/ward.interface";
import { AdministrativeUnit } from "./administrative-unit.model";
import { District } from "./district.model";

@Table({
  underscored: true,
  timestamps: true,
  freezeTableName: true,
})
export class Ward extends Model<IWard> {
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

  @ForeignKey(() => District)
  @Column
  districtCode: string;

  @ForeignKey(() => AdministrativeUnit)
  @Column
  administrativeUnitId: number;

  @BelongsTo(() => District)
  district: District;

  @BelongsTo(() => AdministrativeUnit)
  administrativeUnit: AdministrativeUnit;}