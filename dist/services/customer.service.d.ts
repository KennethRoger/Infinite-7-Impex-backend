import { WithId } from 'mongodb';
import { CustomerRepository } from '../repositories/customer.repository';
import { EmailService } from './email.service';
import { Customer, CreateCustomerDto, CustomerPriority, CustomerQueryFilters } from '../models/customer.model';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';
export declare class CustomerService {
    private customerRepository;
    private emailService;
    constructor(customerRepository: CustomerRepository, emailService: EmailService);
    createCustomer(dto: CreateCustomerDto): Promise<WithId<Customer>>;
    getAllCustomers(filters?: CustomerQueryFilters, pagination?: PaginationOptions, sort?: SortOptions): Promise<PaginatedResult<WithId<Customer>>>;
    getCustomerById(id: string): Promise<WithId<Customer>>;
    updateCustomerPriority(id: string, priority: CustomerPriority): Promise<WithId<Customer>>;
    deleteCustomer(id: string): Promise<boolean>;
}
//# sourceMappingURL=customer.service.d.ts.map