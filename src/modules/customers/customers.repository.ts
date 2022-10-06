import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@src/base/base.repository';
import { DataSource } from 'typeorm';
import { Customer } from './customers.entity';

@Injectable()
export class CustomersRepository extends BaseRepository<Customer> {
  constructor(dataSource: DataSource) {
    super(dataSource, Customer);
  }
}
