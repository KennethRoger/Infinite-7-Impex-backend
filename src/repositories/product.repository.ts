import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { Product, ProductQueryFilters } from '../models/product.model';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export class ProductRepository extends BaseRepository<Product> {
  constructor(db: Db) {
    super(db, 'products');
  }

  async findByCategory(categoryId: string): Promise<WithId<Product>[]> {
    const result = await this.findMany({ category: categoryId, isRemoved: false });
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

  async findFiltered(
    filters: ProductQueryFilters = {},
    pagination?: PaginationOptions,
    sort?: SortOptions
  ): Promise<PaginatedResult<WithId<Product>>> {
    const mongoFilter: Record<string, unknown> = {
      isRemoved: false,
    };

    if (filters.category && filters.category.trim() !== '') {
      mongoFilter['category'] = filters.category.trim();
    }

    if (filters.name && filters.name.trim() !== '') {
      mongoFilter['name'] = {
        $regex: escapeRegex(filters.name.trim()),
        $options: 'i',
      };
    }

    return this.findMany(mongoFilter, pagination, sort);
  }
}