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
import { Delete } from '@nestjs/common/decorators';

@Controller('customer-groups')
@ApiTags('Customer Group')
export class CustomerGroupController {
  constructor(private readonly customersService: CustomerService) {}

  @Get()
  getCustomerGroups() {
    return this.customersService.getCustomerGroups();
  }

  @Post()
  createCustomerGroup(@Body() customerGroup: { name: string }) {
    return this.customersService.createCustomerGroup(customerGroup);
  }

  @Put(':id')
  updateCustomerGroup(@Param('id') id: string, @Body() customerGroup: { name: string }) {
    return this.customersService.updateCustomerGroup(id, customerGroup);
  }

  @Delete(':id')
  deleteCustomerGroup(@Param('id') id: string) {
    return this.customersService.deleteCustomerGroup(id);
  }
}
