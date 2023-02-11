import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IPlace } from "../interfaces/place.interface";

@Table({
  underscored: true,
  timestamps: true,
  freezeTableName: false,
})
export class Place extends Model<IPlace> {
  @Column(DataType.CHAR(50))
  name: string;
}