import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { ProductCategory, ProductCategoryQueryFilters } from '../models/product-category.model';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export class ProductCategoryRepository extends BaseRepository<ProductCategory> {
  constructor(db: Db) {
    super(db, 'productCategories');
  }

  async findActive(): Promise<WithId<ProductCategory>[]> {
    const result = await this.findMany({ isRemoved: false });
    return result.data;
  }

  async findByName(name: string): Promise<WithId<ProductCategory> | null> {
    return this.findOne({
      name: { $regex: `^${escapeRegex(name.trim())}$`, $options: 'i' },
      isRemoved: false,
    });
  }

  async findFiltered(
    filters: ProductCategoryQueryFilters = {},
    pagination?: PaginationOptions,
    sort?: SortOptions
  ): Promise<PaginatedResult<WithId<ProductCategory>>> {
    const mongoFilter: Record<string, unknown> = {
      isRemoved: false,
    };

    if (filters.name && filters.name.trim() !== '') {
      mongoFilter['name'] = {
        $regex: escapeRegex(filters.name.trim()),
        $options: 'i',
      };
    }

    return this.findMany(mongoFilter, pagination, sort);
  }
}