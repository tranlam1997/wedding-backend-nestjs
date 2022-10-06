import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { CustomerDto } from './customers.dto';
import { CustomersService } from './customers.service';

@Controller('customers')
@ApiTags('Customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

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
}
