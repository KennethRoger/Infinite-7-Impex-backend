import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { Customer, CustomerPriority, CustomerQueryFilters } from '../models/customer.model';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export class CustomerRepository extends BaseRepository<Customer> {
  constructor(db: Db) {
    super(db, 'customers');
  }

  async findByEmail(email: string): Promise<WithId<Customer> | null> {
    return this.findOne({ email });
  }

  async findByPhone(phone: string): Promise<WithId<Customer> | null> {
    return this.findOne({ phone });
  }

  async findByCountry(country: string): Promise<WithId<Customer>[]> {
    const result = await this.findMany({ country });
    return result.data;
  }

  async findByPriority(priority: CustomerPriority): Promise<WithId<Customer>[]> {
    const result = await this.findMany({ priority });
    return result.data;
  }

  async findActive(): Promise<WithId<Customer>[]> {
    const result = await this.findMany({ isActive: true });
    return result.data;
  }

  async findActiveByCountry(country: string): Promise<WithId<Customer>[]> {
    const result = await this.findMany({ country, isActive: true });
    return result.data;
  }

  async findActiveByPriority(priority: CustomerPriority): Promise<WithId<Customer>[]> {
    const result = await this.findMany({ priority, isActive: true });
    return result.data;
  }

  async findFiltered(
    filters: CustomerQueryFilters = {},
    pagination?: PaginationOptions,
    sort?: SortOptions
  ): Promise<PaginatedResult<WithId<Customer>>> {
    const mongoFilter: Record<string, unknown> = {};

    if (filters.fullName && filters.fullName.trim() !== '') {
      mongoFilter['fullName'] = { $regex: escapeRegex(filters.fullName.trim()), $options: 'i' };
    }

    if (filters.email && filters.email.trim() !== '') {
      mongoFilter['email'] = { $regex: escapeRegex(filters.email.trim()), $options: 'i' };
    }

    if (filters.country && filters.country.trim() !== '') {
      mongoFilter['country'] = { $regex: escapeRegex(filters.country.trim()), $options: 'i' };
    }

    if (filters.priority) {
      mongoFilter['priority'] = filters.priority;
    }

    if (filters.notes && filters.notes.trim() !== '') {
      mongoFilter['notes'] = { $regex: escapeRegex(filters.notes.trim()), $options: 'i' };
    }

    if (typeof filters.isActive === 'boolean') {
      mongoFilter['isActive'] = filters.isActive;
    }

    return this.findMany(mongoFilter, pagination, sort);
  }
}