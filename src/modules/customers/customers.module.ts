import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './customers.controller';
import { Customer } from './customers.entity';
import { CustomersRepository } from './customers.repository';
import { CustomersService } from './customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomersService, CustomersRepository],
  exports: [CustomersService, CustomersRepository],
  controllers: [CustomersController],
})
export class CustomersModule {}
