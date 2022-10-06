import { Place } from '@src/modules/address/entities/places.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from '../../customers/customers.entity';
import { User } from '../../users/users.entity';
import { Attachment } from './attachments.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
    length: `100`,
    nullable: true,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  guestEstimate: string;

  @Column({           
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  feedback: string;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  startTime: number;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  endTime: number;

  @Column({
    type: 'int',
  })
  typeId: number;

  @ManyToOne(() => Place, (place) => place.id)
  place: Place;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  placeNote: string;

  @ManyToOne(() => Place, (place) => place.id)
  backupPlace: Place;

  @Column({
    type: 'int',
    default: 0,
  })
  deposit: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  depositNote: string;

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  checkList: string;

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer: Customer;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToMany(() => Attachment, (attachment) => attachment.id, {
    cascade: true,
  })
  @JoinTable()
  attachments: Attachment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}





