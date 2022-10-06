import { Injectable } from '@nestjs/common';
import { ICustomer } from './customers.interface';
import { CustomersRepository } from './customers.repository';

@Injectable()
export class CustomersService {
  constructor(
    private readonly customersRepository: CustomersRepository,
  ) {}

  async getCustomers() {
    return await this.customersRepository.find({});
  }

  async findByPhoneOrName({phoneNumber, name}: {phoneNumber: string, name: string}) {
    return await this.customersRepository.find({
      where: {
        phoneNumber,
        name,
      },
    });
  }

  async getCustomerById(id: string) {
    return await this.customersRepository.findOne(id);
  }

  async createCustomer(customer: ICustomer) {
    return await this.customersRepository.create(customer);
  }

  async updateCustomer(id: string, customer: ICustomer) {
    return await this.customersRepository.update(id, customer);
  }
}
