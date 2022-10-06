import { Entity, PrimaryColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { AdministrativeUnit } from "./administrative-units.entity";
import { Province } from "./provinces.entity";

@Entity('districts')
export class District {
  @PrimaryColumn({
    type: 'varchar',
    length: 20,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  nameEn: string;

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
  codeName: string;

  @ManyToOne(() => Province, (province) => province.code)
  province: Province;

  @OneToOne(() => AdministrativeUnit, (administrativeUnit) => administrativeUnit.id)
  @JoinColumn()
  administrativeUnit: AdministrativeUnit;
}