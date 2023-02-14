import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { CustomerService } from '../customer.service';
import { CustomerDto } from '../dto/customer.dto';
import { Delete } from '@nestjs/common/decorators';

@Controller('customers')
@ApiTags('Customers')
export class CustomerController {
  constructor(private readonly customersService: CustomerService) {}

  @Get()
  getCustomers() {
    return this.customersService.getCustomers();
  }

  @Get('findByPhoneOrName')
  findByPhoneOrName(@Query('phoneNumber') phoneNumber: string, @Query('name') name: string) {
    return this.customersService.findByPhoneOrName({ phoneNumber, name });
  }

  @Get(':id')
  getCustomerById(@Param('id') id: string) {
    return this.customersService.getCustomerById(id);
  }

  @Post()
  createCustomer(@Body() customer: CustomerDto) {
    return this.customersService.createCustomer(customer);
  }

  @Put(':id')
  updateCustomer(@Param('id') id: string, @Body() customer: CustomerDto) {
    return this.customersService.updateCustomer(id, customer);
  }
}
