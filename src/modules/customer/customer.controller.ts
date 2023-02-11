import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
import { Delete } from '@nestjs/common/decorators';

@Controller('customers')
@ApiTags('Customers')
export class CustomerController {
  constructor(private readonly customersService: CustomerService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'Get all customers success',
  })
  @ApiCommonResponse()
  getCustomers() {
    return this.customersService.getCustomers();
  }

  @Get('findByPhoneOrName')
  @ApiOkResponse({
    status: 200,
    description: 'Get all customers success',
  })
  @ApiCommonResponse()
  @ApiQuery({
    name: 'phoneNumber',
    description: 'Phone number',
    required: false,
  })
  @ApiQuery({
    name: 'name',
    description: 'Name',
    required: false,
  })
  findByPhoneOrName(@Query('phoneNumber') phoneNumber: string, @Query('name') name: string) {
    return this.customersService.findByPhoneOrName({ phoneNumber, name });
  }

  @Get('/:id')
  @ApiOkResponse({
    status: 200,
    description: 'Get customer by id success',
  })
  @ApiCommonResponse()
  @ApiParam({
    name: 'id',
    description: 'Customer id',
  })
  getCustomerById(@Param('id') id: string) {
    return this.customersService.getCustomerById(id);
  }

  @Post()
  @ApiCreatedResponse({
    status: 201,
    description: 'Create customer success',
  })
  @ApiCommonResponse()
  @ApiBody({
    type: CustomerDto,
  })
  createCustomer(@Body() customer: CustomerDto) {
    return this.customersService.createCustomer(customer);
  }

  @Put(':id')
  @ApiOkResponse({
    status: 200,
    description: 'Update customer success',
  })
  @ApiCommonResponse()
  @ApiParam({
    name: 'id',
    description: 'Customer id',
  })
  @ApiBody({
    type: CustomerDto,
  })
  updateCustomer(@Param('id') id: string, @Body() customer: CustomerDto) {
    return this.customersService.updateCustomer(id, customer);
  }

  @Get('customer-groups')
  @ApiOkResponse({
    status: 200,
    description: 'Get all customer group success',
  })
  @ApiCommonResponse()
  getCustomerGroups() {
    return this.customersService.getCustomerGroups();
  }

  @Post('customer-groups')
  @ApiCreatedResponse({
    status: 201,
    description: 'Create customer group success',
  })
  @ApiCommonResponse()
  createCustomerGroup(@Body() customerGroup: { name: string }) {
    return this.customersService.createCustomerGroup(customerGroup);
  }

  @Put('customer-groups/:id')
  @ApiOkResponse({
    status: 200,
    description: 'Update customer group success',
  })
  @ApiParam({
    name: 'id',
    description: 'Customer id',
  })
  @ApiCommonResponse()
  updateCustomerGroup(@Param('id') id: string, @Body() customerGroup: { name: string }) {
    return this.customersService.updateCustomerGroup(id, customerGroup);
  }

  @Delete('customer-groups/:id')
  @ApiOkResponse({
    status: 200,
    description: 'Delete customer group success',
  })
  @ApiParam({
    name: 'id',
    description: 'Customer id',
  })
  @ApiCommonResponse()
  deleteCustomerGroup(@Param('id') id: string) {
    return this.customersService.deleteCustomerGroup(id);
  }
}
