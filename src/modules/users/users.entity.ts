import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Role } from '../auth/auth.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
    length: 32,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  password: string;

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
  email: string;

  @Column({
    type: 'varchar',
    length: 12,
    name: 'tel',
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  @Index()
  provider: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  @Index()
  providerId: string;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  emailVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Role, (role) => role.id)
  rolse: Role[];
}
