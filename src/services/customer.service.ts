import { WithId } from 'mongodb';
import { CustomerRepository } from '../repositories/customer.repository';
import { EmailService } from './email.service';
import { Customer, CreateCustomerDto } from '../models/customer.model';

export class CustomerService {
  constructor(
    private customerRepository: CustomerRepository,
    private emailService: EmailService
  ) {}

  async createCustomer(dto: CreateCustomerDto): Promise<WithId<Customer>> {
    const createdCustomer = await this.customerRepository.create(dto);

    // Trigger notification to admin email without blocking DB creation on mail errors
    try {
      await this.emailService.sendCustomerEnquiryNotification({
        fullName: createdCustomer.fullName,
        country: createdCustomer.country,
        email: createdCustomer.email,
        phone: createdCustomer.phone,
        message: createdCustomer.message,
        createdAt: createdCustomer.createdAt,
      });
    } catch (mailError) {
      console.error('[CustomerService] Email dispatch failed:', mailError);
    }

    return createdCustomer;
  }
}
