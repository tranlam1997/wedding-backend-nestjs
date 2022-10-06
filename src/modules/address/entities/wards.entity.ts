import { Customer } from "@src/modules/customers/customers.entity";
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { AdministrativeUnit } from "./administrative-units.entity";
import { District } from "./districts.entity";

@Entity('wards')
export class Ward {
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

  @ManyToOne(() => District, (district) => district.code)
  district: District;

  @OneToOne(() => AdministrativeUnit, (administrativeUnit) => administrativeUnit.id)
  @JoinColumn()
  administrativeUnit: AdministrativeUnit;
}