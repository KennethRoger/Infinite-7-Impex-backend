import { ObjectId, WithId } from 'mongodb';
import { ProductCategoryRepository } from '../repositories/product-category.repository';
import { ProductRepository } from '../repositories/product.repository';
import {
  ProductCategory,
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
  ProductCategoryQueryFilters,
} from '../models/product-category.model';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';
import { AppError } from '../middleware/error-handler';
import { HTTP_STATUS } from '../types/http-status';
import { ERROR_CODES } from '../types/error-codes';

export class ProductCategoryService {
  constructor(
    private productCategoryRepository: ProductCategoryRepository,
    private productRepository?: ProductRepository
  ) {}

  async createCategory(dto: CreateProductCategoryDto): Promise<WithId<ProductCategory>> {
    const existing = await this.productCategoryRepository.findByName(dto.name);
    if (existing) {
      throw new AppError(
        HTTP_STATUS.CONFLICT,
        ERROR_CODES.DUPLICATE_ENTRY,
        `Category with name '${dto.name}' already exists`
      );
    }

    return this.productCategoryRepository.create({
      ...dto,
      isRemoved: false,
    });
  }

  async updateCategory(
    id: string,
    dto: UpdateProductCategoryDto
  ): Promise<WithId<ProductCategory>> {
    if (!ObjectId.isValid(id)) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Category not found');
    }

    const existing = await this.productCategoryRepository.findById(id);
    if (!existing || existing.isRemoved) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Category not found');
    }

    if (dto.name && dto.name.trim().toLowerCase() !== existing.name.trim().toLowerCase()) {
      const duplicate = await this.productCategoryRepository.findByName(dto.name);
      if (duplicate && duplicate._id.toString() !== id) {
        throw new AppError(
          HTTP_STATUS.CONFLICT,
          ERROR_CODES.DUPLICATE_ENTRY,
          `Category with name '${dto.name}' already exists`
        );
      }
    }

    const updated = await this.productCategoryRepository.update(id, dto);
    if (!updated) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Category not found');
    }

    return updated;
  }

  async deleteCategory(
    id: string
  ): Promise<{ _id: string; name: string; isRemoved: true }> {
    if (!ObjectId.isValid(id)) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Category not found');
    }

    const existing = await this.productCategoryRepository.findById(id);
    if (!existing) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Category not found');
    }

    // Prevent deletion if category contains active products
    if (this.productRepository) {
      const activeProducts = await this.productRepository.findActiveByCategory(id);
      if (activeProducts.length > 0) {
        throw new AppError(
          HTTP_STATUS.CONFLICT,
          ERROR_CODES.CONFLICT,
          `Cannot delete category '${existing.name}' because it contains ${activeProducts.length} active product(s). Please reassign or remove the products first.`,
          [{ field: 'category', message: `Category contains ${activeProducts.length} active product(s)` }]
        );
      }
    }

    const isDeleted = await this.productCategoryRepository.delete(id);
    if (!isDeleted) {
      throw new AppError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_CODES.SERVER_ERROR,
        'Failed to delete category'
      );
    }

    return {
      _id: id,
      name: existing.name,
      isRemoved: true,
    };
  }

  async getAllCategories(
    filters: ProductCategoryQueryFilters = {},
    pagination?: PaginationOptions,
    sort?: SortOptions
  ): Promise<PaginatedResult<WithId<ProductCategory>>> {
    return this.productCategoryRepository.findFiltered(filters, pagination, sort);
  }

  async getCategoryById(id: string): Promise<WithId<ProductCategory>> {
    if (!ObjectId.isValid(id)) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Category not found');
    }

    const category = await this.productCategoryRepository.findById(id);
    if (!category || category.isRemoved) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Category not found');
    }

    return category;
  }
}
