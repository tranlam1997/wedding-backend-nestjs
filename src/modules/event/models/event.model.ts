import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany, Index } from 'sequelize-typescript';
import { IEvent } from '../interfaces/event.interface';
import { User } from '@src/modules/user/models/user.model';
import { Customer } from '../../customer/models/customer.model';
import { Place } from '@src/modules/address/models/place.model';

@Table({
  underscored: true,
  timestamps: true,
  freezeTableName: false,
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
})
export class Event extends Model<IEvent> {
  @Column(DataType.CHAR(100))
  title: string;

  @Column(DataType.CHAR(100))
  titleEn: string;

  @Column(DataType.CHAR(100))
  guestEstimate: string;

  @Column({
    type: DataType.SMALLINT,
    defaultValue: 0,
  })
  tableCount: number;

  @Column({
    type: DataType.SMALLINT,
    defaultValue: 0,
  })
  tableSize: number;

  @Column(DataType.CHAR(250))
  feedback: string;

  @Column(DataType.BIGINT)
  startTime: number;

  @Column(DataType.BIGINT)
  endTime: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  typeId: number;

  @ForeignKey(() => Place)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  placeId: number;

  @BelongsTo(() => Place)
  place: Place;

  @Column(DataType.CHAR(250))
  placeNote: string;

  @ForeignKey(() => Place)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  backupPlaceId: number;

  @BelongsTo(() => Place)
  backupPlace: Place;

  @Column(DataType.BOOLEAN)
  isCanceled: boolean;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  deposit: number;

  @Column({
    type: DataType.CHAR(200),
  })
  depositNote: string;

  @Column(DataType.TEXT)
  checkList: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  customerId: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @Column(DataType.BOOLEAN)
  enableChat: boolean;

  @Column({
    type: DataType.CHAR(20),
  })
  dateTime: string;
}
