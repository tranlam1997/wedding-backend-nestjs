import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IAdministrativeUnit } from '../interfaces/administrative-unit.interface';

@Table({
  underscored: true,
  timestamps: false,
  freezeTableName: false,
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
})
export class AdministrativeUnit extends Model<IAdministrativeUnit> {
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
  shortName: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: true,
  })
  shortNameEn: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: true,
  })
  codeName: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: true,
  })
  codeNameEn: string;
}
