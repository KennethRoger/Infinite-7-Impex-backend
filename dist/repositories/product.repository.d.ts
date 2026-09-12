import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { Product, ProductQueryFilters } from '../models/product.model';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';
export declare class ProductRepository extends BaseRepository<Product> {
    constructor(db: Db);
    findByCategory(categoryId: string): Promise<WithId<Product>[]>;
    findActive(): Promise<WithId<Product>[]>;
    findActiveByCategory(categoryId: string): Promise<WithId<Product>[]>;
    findFiltered(filters?: ProductQueryFilters, pagination?: PaginationOptions, sort?: SortOptions): Promise<PaginatedResult<WithId<Product>>>;
}
//# sourceMappingURL=product.repository.d.ts.map