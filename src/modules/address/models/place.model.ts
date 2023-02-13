import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IPlace } from "../interfaces/place.interface";

@Table({
  underscored: true,
  timestamps: true,
  freezeTableName: false,
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
})
export class Place extends Model<IPlace> {
  @Column({
    type: DataType.CHAR(50),
    allowNull: false,
  })
  name: string;

  @Column(DataType.CHAR(21))
  photoId: string;

  @Column(DataType.STRING(4000))
  settings: string;
}