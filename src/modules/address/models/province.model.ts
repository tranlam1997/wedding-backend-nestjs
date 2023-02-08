import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IProvince } from '../interfaces/province.interface';
import { AdministrativeRegion } from './administrative-region.model';
import { AdministrativeUnit } from './administrative-unit.model';

@Table({
  underscored: true,
  timestamps: true,
  freezeTableName: true,
})
export class Province extends Model<IProvince> {
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

  @ForeignKey(() => AdministrativeUnit)
  @Column
  administrativeUnitId: number;

  @BelongsTo(() => AdministrativeUnit)
  administrativeUnit: AdministrativeUnit;

  @ForeignKey(() => AdministrativeRegion)
  @Column
  administrativeRegionId: number;

  @BelongsTo(() => AdministrativeRegion)
  administrativeRegion: AdministrativeRegion;
}
