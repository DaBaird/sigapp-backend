import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customersRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`); // Instead of returning null, throw an error
    }
    return customer;
  }
  
  async create(customerData: Partial<Customer>): Promise<Customer> {
    return this.customersRepository.save(customerData);
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }
}