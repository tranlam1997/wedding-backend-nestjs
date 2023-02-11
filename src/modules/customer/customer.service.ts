import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICustomer } from './interfaces/customer.interface';
import { Customer } from './models/customer.model';
import { CustomerGroup } from './models/customer-group.model';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) private readonly customerModel: typeof Customer,
    @InjectModel(CustomerGroup) private readonly customerGroupModel: typeof CustomerGroup,
  ) {}

  async getCustomers() {
    const customers = await this.customerModel.findAll({
      include: [{ all: true }]
    });
    return {
      error: false,
      data: customers,
      message: 'Customer list',
    }
  }

  async findByPhoneOrName({phoneNumber = null, name = null}: {phoneNumber?: string, name?: string}) {
    const customer = await this.customerModel.findOne({
      where: {
        phoneNumber,
        name
      },
      include: [{ all: true }]
    });

    return {
      error: false,
      data: customer,
      message: 'Customer list',
    }
  }

  async getCustomerById(id: string) {
    const customer = await this.customerModel.findByPk(id, {
      include: [{ all: true }]
    });

    return {
      error: false,
      data: customer,
      message: 'Customer list',
    }
  }

  async createCustomer(customer: ICustomer) {
    const newCustomer = await this.customerModel.create(customer);
    return {
      error: false,
      data: newCustomer,
      message: 'Customer created',
    }
  }

  async updateCustomer(id: string, customer: ICustomer) {
    const updatedCustomer = await this.customerModel.update(customer, {
      where: {
        id
      }
    });

    return {
      error: false,
      data: updatedCustomer,
      message: 'Customer updated',
    }
  }

  async getCustomerGroups() {
    const customerGroups = await this.customerGroupModel.findAll({});
    return {
      error: false,
      data: customerGroups,
      message: 'Customer group list',
    }
  }

  async createCustomerGroup(customerGroup: {name: string}) {
    const newCustomerGroup = await this.customerGroupModel.create(customerGroup);
    return {
      error: false,
      data: newCustomerGroup,
      message: 'Customer group created',
    }
  }

  async updateCustomerGroup(id: string, customerGroup: {name: string}) {
    const updatedCustomerGroup = await this.customerGroupModel.update(customerGroup, {
      where: {
        id
      }
    });

    return {
      error: false,
      data: updatedCustomerGroup,
      message: 'Customer group updated',
    }
  }

  async deleteCustomerGroup(id: string) {
    const deletedCustomerGroup = await this.customerGroupModel.destroy({
      where: {
        id
      }
    });

    return {
      error: false,
      data: deletedCustomerGroup,
      message: 'Customer group deleted',
    }
  }
}
