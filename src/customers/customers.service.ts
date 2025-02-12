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
    console.log(`Fetching customer with ID: ${id}`);
    const customer = await this.customersRepository.find();
    console.log(`All customers in DB:`, customer);
    return this.customersRepository.findOneByOrFail({ id });
  }

//  async findOne(id: number): Promise<Customer> {
//    return this.customersRepository.findOneByOrFail({ id });
//  }
  
  async create(customerData: Partial<Customer>): Promise<Customer> {
    return this.customersRepository.save(customerData);
  }

  async remove(id: number): Promise<void> {
    const customer = await this.findOne(id); // This ensures NotFoundException is thrown if customer doesn’t exist
    await this.customersRepository.remove(customer);
  }  
}