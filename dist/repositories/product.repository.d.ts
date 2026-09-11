import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { Product } from '../models/product.model';
export declare class ProductRepository extends BaseRepository<Product> {
    constructor(db: Db);
    findByCategory(categoryId: string): Promise<WithId<Product>[]>;
    findActive(): Promise<WithId<Product>[]>;
    findActiveByCategory(categoryId: string): Promise<WithId<Product>[]>;
}
//# sourceMappingURL=product.repository.d.ts.map