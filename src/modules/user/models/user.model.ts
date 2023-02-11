import { Role } from '@src/modules/role/models/role.model';
import { Column, Table, DataType, ForeignKey, HasOne, Index, Model } from 'sequelize-typescript';
import { IUser } from '../interfaces/user.interface';

@Table({
  underscored: true,
  timestamps: true,
  freezeTableName: false,
})
export class User extends Model<IUser> {
  @Column({
    type: DataType.CHAR(50),
    allowNull: true
  })
  displayName: string;

  @Column({
    type: DataType.CHAR(100),
    allowNull: true
  })
  password: string;

  @Column({
    type: DataType.CHAR(128),
    allowNull: true
  })
  photoUrl: string;

  @Column({
    type: DataType.CHAR(21),
    allowNull: true
  })
  photoId: string;

  @Column({
    type: DataType.CHAR(21),
    allowNull: true
  })
  backgroundId: string;

  @Column({
    type: DataType.CHAR(32),
    allowNull: true,
    unique: true
  })
  uid: string;

  @Column({
    type: DataType.CHAR(128),
    allowNull: true,
    unique: true
  })
  email: string;

  @Column({
    type: DataType.CHAR(12),
    allowNull: true
  })
  tel: string;

  @Column({
    type: DataType.CHAR(50),
    allowNull: true
  })
  provider: string;

  @Column({
    type: DataType.CHAR(20),
    allowNull: true
  })
  providerId: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true
  })
  emailVerified: boolean;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  roleId: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  active: boolean;

  @Column({
    type: DataType.CHAR(32),
    allowNull: false,
    defaultValue: ''
  })
  clientVersion: string;

  @Column({
    type: DataType.CHAR(20),
    allowNull: false,
    defaultValue: ''
  })
  clientType: string;
}
