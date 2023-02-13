import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IAdministrativeRegion } from '../interfaces/administrative-region.interface';

@Table({
  underscored: true,
  timestamps: false,
  freezeTableName: false,
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
})
export class AdministrativeRegion extends Model<IAdministrativeRegion> {
  @Column({
    type: DataType.CHAR(255),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: false,
  })
  nameEn: string;

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