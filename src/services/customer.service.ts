import { ObjectId, WithId } from 'mongodb';
import { CustomerRepository } from '../repositories/customer.repository';
import { EmailService } from './email.service';
import { Customer, CreateCustomerDto, CustomerPriority, CustomerQueryFilters } from '../models/customer.model';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';
import { AppError } from '../middleware/error-handler';
import { HTTP_STATUS } from '../types/http-status';
import { ERROR_CODES } from '../types/error-codes';

export class CustomerService {
  constructor(
    private customerRepository: CustomerRepository,
    private emailService: EmailService
  ) {}

  async createCustomer(dto: CreateCustomerDto): Promise<WithId<Customer>> {
    const createdCustomer = await this.customerRepository.create(dto);

    // Dispatch notification to admin email in background without blocking HTTP response
    this.emailService
      .sendCustomerEnquiryNotification({
        fullName: createdCustomer.fullName,
        country: createdCustomer.country,
        email: createdCustomer.email,
        phone: createdCustomer.phone,
        message: createdCustomer.message,
        createdAt: createdCustomer.createdAt,
      })
      .catch((mailError) => {
        console.error('[CustomerService] Background email dispatch failed:', mailError);
      });

    return createdCustomer;
  }

  async getAllCustomers(
    filters: CustomerQueryFilters = {},
    pagination?: PaginationOptions,
    sort?: SortOptions
  ): Promise<PaginatedResult<WithId<Customer>>> {
    return this.customerRepository.findFiltered(filters, pagination, sort);
  }

  async getCustomerById(id: string): Promise<WithId<Customer>> {
    if (!ObjectId.isValid(id)) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Customer not found');
    }

    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Customer not found');
    }

    return customer;
  }

  async updateCustomerPriority(id: string, priority: CustomerPriority): Promise<WithId<Customer>> {
    if (!ObjectId.isValid(id)) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Customer not found');
    }

    const existingCustomer = await this.customerRepository.findById(id);
    if (!existingCustomer) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Customer not found');
    }

    const updatedCustomer = await this.customerRepository.update(id, { priority });
    if (!updatedCustomer) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Customer not found');
    }

    return updatedCustomer;
  }

  async updateCustomerNotes(id: string, notes: string): Promise<WithId<Customer>> {
    if (!ObjectId.isValid(id)) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Customer not found');
    }

    const existingCustomer = await this.customerRepository.findById(id);
    if (!existingCustomer) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Customer not found');
    }

    const updatedCustomer = await this.customerRepository.update(id, { notes });
    if (!updatedCustomer) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Customer not found');
    }

    return updatedCustomer;
  }

  async deleteCustomer(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Customer not found');
    }

    const existingCustomer = await this.customerRepository.findById(id);
    if (!existingCustomer) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Customer not found');
    }

    const isDeleted = await this.customerRepository.delete(id);
    if (!isDeleted) {
      throw new AppError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_CODES.SERVER_ERROR,
        'Failed to delete customer'
      );
    }

    return true;
  }
}
