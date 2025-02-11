import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customers.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.customersService.findOne(Number(id)); // No need for `null` handling anymore
  }


  @Post()
  create(@Body() customerData: Partial<Customer>): Promise<Customer> {
    return this.customersService.create(customerData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.customersService.remove(Number(id));
  }
}
