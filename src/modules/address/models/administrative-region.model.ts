import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IAdministrativeRegion } from '../interfaces/administrative-region.interface';

@Table({
  underscored: true,
  timestamps: true,
  freezeTableName: true,
})
export class AdministrativeRegion extends Model<IAdministrativeRegion> {
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
  codeName: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: true,
  })
  codeNameEn: string;
}