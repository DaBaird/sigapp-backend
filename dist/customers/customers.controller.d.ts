import { CustomersService } from './customers.service';
import { Customer } from './customers.entity';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    findAll(): Promise<Customer[]>;
    findOne(id: number): Promise<Customer>;
    create(customerData: Partial<Customer>): Promise<Customer>;
    remove(id: number): Promise<void>;
    testDb(): Promise<Customer>;
}
