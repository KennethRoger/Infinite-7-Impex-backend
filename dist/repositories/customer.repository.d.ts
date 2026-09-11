import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { Customer, CustomerPriority } from '../models/customer.model';
export declare class CustomerRepository extends BaseRepository<Customer> {
    constructor(db: Db);
    findByEmail(email: string): Promise<WithId<Customer> | null>;
    findByPhone(phone: string): Promise<WithId<Customer> | null>;
    findByCountry(country: string): Promise<WithId<Customer>[]>;
    findByPriority(priority: CustomerPriority): Promise<WithId<Customer>[]>;
    findActive(): Promise<WithId<Customer>[]>;
    findActiveByCountry(country: string): Promise<WithId<Customer>[]>;
    findActiveByPriority(priority: CustomerPriority): Promise<WithId<Customer>[]>;
}
//# sourceMappingURL=customer.repository.d.ts.map