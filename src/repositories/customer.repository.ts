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
    const conditions: Record<string, unknown>[] = [];

    if (filters.search && filters.search.trim() !== '') {
      const searchRegex = { $regex: escapeRegex(filters.search.trim()), $options: 'i' };
      conditions.push({
        $or: [
          { fullName: searchRegex },
          { email: searchRegex },
          { country: searchRegex },
          { phone: searchRegex },
          { notes: searchRegex },
          { message: searchRegex },
        ],
      });
    }

    if (filters.fullName && filters.fullName.trim() !== '') {
      conditions.push({ fullName: { $regex: escapeRegex(filters.fullName.trim()), $options: 'i' } });
    }

    if (filters.email && filters.email.trim() !== '') {
      conditions.push({ email: { $regex: escapeRegex(filters.email.trim()), $options: 'i' } });
    }

    if (filters.country && filters.country.trim() !== '') {
      conditions.push({ country: { $regex: escapeRegex(filters.country.trim()), $options: 'i' } });
    }

    if (filters.priority) {
      conditions.push({ priority: filters.priority });
    }

    if (filters.notes && filters.notes.trim() !== '') {
      conditions.push({ notes: { $regex: escapeRegex(filters.notes.trim()), $options: 'i' } });
    }

    if (typeof filters.isActive === 'boolean') {
      conditions.push({ isActive: filters.isActive });
    }

    const mongoFilter: Record<string, unknown> =
      conditions.length === 0
        ? {}
        : conditions.length === 1
        ? conditions[0]!
        : { $and: conditions };

    return this.findMany(mongoFilter, pagination, sort);
  }
}