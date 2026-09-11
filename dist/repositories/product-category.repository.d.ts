import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { ProductCategory } from '../models/product-category.model';
export declare class ProductCategoryRepository extends BaseRepository<ProductCategory> {
    constructor(db: Db);
    findActive(): Promise<WithId<ProductCategory>[]>;
    findByName(name: string): Promise<WithId<ProductCategory> | null>;
}
//# sourceMappingURL=product-category.repository.d.ts.map