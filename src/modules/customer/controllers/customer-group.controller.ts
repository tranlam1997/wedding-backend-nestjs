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
import { CustomerService } from '../customer.service';
import { Delete } from '@nestjs/common/decorators';

@Controller('customer-groups')
@ApiTags('Customer Group')
export class CustomerGroupController {
  constructor(private readonly customersService: CustomerService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'Get all customer group success',
  })
  @ApiCommonResponse()
  getCustomerGroups() {
    return this.customersService.getCustomerGroups();
  }

  @Post()
  @ApiCreatedResponse({
    status: 201,
    description: 'Create customer group success',
  })
  @ApiCommonResponse()
  createCustomerGroup(@Body() customerGroup: { name: string }) {
    return this.customersService.createCustomerGroup(customerGroup);
  }

  @Put(':id')
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

  @Delete(':id')
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
