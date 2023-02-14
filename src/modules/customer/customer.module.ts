import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './models/customer.model';
import { CustomerGroup } from './models/customer-group.model';
import { CustomerGroupController } from './controllers/customer-group.controller';

@Module({
  imports: [SequelizeModule.forFeature([Customer, CustomerGroup])],
  controllers: [CustomerController, CustomerGroupController],
  providers: [CustomerService],
  exports: [CustomerService, SequelizeModule],
})
export class CustomerModule {}
