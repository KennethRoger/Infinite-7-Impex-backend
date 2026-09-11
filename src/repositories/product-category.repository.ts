import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { ProductCategory } from '../models/product-category.model';

export class ProductCategoryRepository extends BaseRepository<ProductCategory> {
  constructor(db: Db) {
    super(db, 'productCategories');
  }

  async findActive(): Promise<WithId<ProductCategory>[]> {
    const result = await this.findMany({ isRemoved: false });
    return result.data;
  }

  async findByName(name: string): Promise<WithId<ProductCategory> | null> {
    return this.findOne({ name });
  }
}