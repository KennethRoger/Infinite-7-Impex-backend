import { WithId } from 'mongodb';
import { CustomerRepository } from '../repositories/customer.repository';
import { EmailService } from './email.service';
import { Customer, CreateCustomerDto } from '../models/customer.model';
export declare class CustomerService {
    private customerRepository;
    private emailService;
    constructor(customerRepository: CustomerRepository, emailService: EmailService);
    createCustomer(dto: CreateCustomerDto): Promise<WithId<Customer>>;
}
//# sourceMappingURL=customer.service.d.ts.map