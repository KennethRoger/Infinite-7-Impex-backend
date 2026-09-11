import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { Product } from '../models/product.model';

export class ProductRepository extends BaseRepository<Product> {
  constructor(db: Db) {
    super(db, 'products');
  }

  async findByCategory(categoryId: string): Promise<WithId<Product>[]> {
    const result = await this.findMany({ category: categoryId });
    return result.data;
  }

  async findActive(): Promise<WithId<Product>[]> {
    const result = await this.findMany({ isRemoved: false });
    return result.data;
  }

  async findActiveByCategory(categoryId: string): Promise<WithId<Product>[]> {
    const result = await this.findMany({ category: categoryId, isRemoved: false });
    return result.data;
  }
}