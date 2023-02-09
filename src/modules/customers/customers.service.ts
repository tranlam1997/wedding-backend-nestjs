import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './customers.model';
import { ICustomer } from './customers.interface';
import { CustomersRepository } from './customers.repository';

@Injectable()
export class CustomersService {
  constructor(
    private readonly customersRepository: CustomersRepository,
    @InjectModel(Customer) private readonly customerModel: typeof Customer,
  ) {}

  async getCustomers() {
    return this.customerModel.findAll({});
  }

  async findByPhoneOrName({phoneNumber, name}: {phoneNumber: string, name: string}) {}

  async getCustomerById(id: string) {
  }

  async createCustomer(customer: ICustomer) {}

  async updateCustomer(id: string, customer: ICustomer) {}
}
