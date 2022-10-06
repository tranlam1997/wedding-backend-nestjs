import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { AdministrativeRegion } from "./administrative-regions.entity";
import { AdministrativeUnit } from "./administrative-units.entity";

@Entity('provinces')
export class Province {
  @PrimaryColumn({
    type: 'varchar',
    length: 20,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
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

  @OneToOne(() => AdministrativeUnit, (administrativeUnit) => administrativeUnit.id)
  @JoinColumn()
  administrativeUnit: AdministrativeUnit;

  @OneToOne(() => AdministrativeRegion, (administrativeRegion) => administrativeRegion.id)
  @JoinColumn()
  administrativeRegion: AdministrativeRegion;
}