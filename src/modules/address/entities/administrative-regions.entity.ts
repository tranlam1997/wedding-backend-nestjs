import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Province } from "./provinces.entity";

@Entity('administrative_regions')
export class AdministrativeRegion {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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
  codeName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  codeNameEn: string;
}