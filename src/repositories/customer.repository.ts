import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { Customer, CustomerPriority } from '../models/customer.model';

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
}