import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { District } from '../address/entities/districts.entity';
import { Province } from '../address/entities/provinces.entity';
import { Ward } from '../address/entities/wards.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  @Index()
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'tel',
    nullable: true,
  })
  @Index()
  phoneNumber: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'addr',
    nullable: true,
  })
  address: string;

  @ManyToOne(() => Province, (province) => province.code)
  province: Province;

  @ManyToOne(() => District, (district) => district.code)
  district: District;

  @ManyToOne(() => Ward, (ward) => ward.code)
  ward: Ward;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  avatar: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  @Index()
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  @Index()
  delegatePerson: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  @Index()
  delegateMobile: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  company: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  note: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
