import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { ProductCategory, ProductCategoryQueryFilters } from '../models/product-category.model';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';
export declare class ProductCategoryRepository extends BaseRepository<ProductCategory> {
    constructor(db: Db);
    findActive(): Promise<WithId<ProductCategory>[]>;
    findByName(name: string): Promise<WithId<ProductCategory> | null>;
    findFiltered(filters?: ProductCategoryQueryFilters, pagination?: PaginationOptions, sort?: SortOptions): Promise<PaginatedResult<WithId<ProductCategory>>>;
}
//# sourceMappingURL=product-category.repository.d.ts.map