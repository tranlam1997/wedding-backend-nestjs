import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './models/customer.model';
import { CustomerGroup } from './models/customer-group.model';

@Module({
  imports: [SequelizeModule.forFeature([Customer, CustomerGroup])],
  providers: [CustomerService],
  exports: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
