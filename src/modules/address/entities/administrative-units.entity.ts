import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { District } from "./districts.entity";
import { Province } from "./provinces.entity";
import { Ward } from "./wards.entity";

@Entity('administrative_units')
export class AdministrativeUnit {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  fullNameEn: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  shortName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  shortNameEn: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  codeName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  codeNameEn: string;
}