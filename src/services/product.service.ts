import { ObjectId, WithId } from 'mongodb';
import { ProductRepository } from '../repositories/product.repository';
import { ProductCategoryRepository } from '../repositories/product-category.repository';
import {
  Product,
  CreateProductDto,
  UpdateProductDto,
  ProductQueryFilters,
  PopulatedProduct,
  PopulatedCategory,
} from '../models/product.model';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';
import { AppError } from '../middleware/error-handler';
import { HTTP_STATUS } from '../types/http-status';
import { ERROR_CODES } from '../types/error-codes';

export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private productCategoryRepository: ProductCategoryRepository
  ) {}

  private async validateCategoryExists(categoryId: string): Promise<void> {
    if (!ObjectId.isValid(categoryId)) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.INVALID_REFERENCE,
        'Referenced category does not exist',
        [{ field: 'category', message: 'No category found with this ID' }]
      );
    }

    const category = await this.productCategoryRepository.findById(categoryId);
    if (!category || category.isRemoved) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.INVALID_REFERENCE,
        'Referenced category does not exist',
        [{ field: 'category', message: 'No category found with this ID' }]
      );
    }
  }

  async createProduct(dto: CreateProductDto): Promise<WithId<Product>> {
    await this.validateCategoryExists(dto.category);

    return this.productRepository.create({
      ...dto,
      isRemoved: false,
    });
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<WithId<Product>> {
    if (!ObjectId.isValid(id)) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Product not found');
    }

    const existing = await this.productRepository.findById(id);
    if (!existing || existing.isRemoved) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Product not found');
    }

    if (dto.category) {
      await this.validateCategoryExists(dto.category);
    }

    const updated = await this.productRepository.update(id, dto);
    if (!updated) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Product not found');
    }

    return updated;
  }

  async deleteProduct(
    id: string
  ): Promise<{ _id: string; name: string; isRemoved: true }> {
    if (!ObjectId.isValid(id)) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Product not found');
    }

    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Product not found');
    }

    const isDeleted = await this.productRepository.delete(id);
    if (!isDeleted) {
      throw new AppError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_CODES.SERVER_ERROR,
        'Failed to delete product'
      );
    }

    return {
      _id: id,
      name: existing.name,
      isRemoved: true,
    };
  }

  async getAllProducts(
    filters: ProductQueryFilters = {},
    pagination?: PaginationOptions,
    sort?: SortOptions
  ): Promise<PaginatedResult<PopulatedProduct>> {
    const result = await this.productRepository.findFiltered(filters, pagination, sort);

    // Populate category for each product
    const categoryIds = Array.from(new Set(result.data.map((p) => p.category)));
    const categoryMap = new Map<string, PopulatedCategory>();

    await Promise.all(
      categoryIds.map(async (catId) => {
        if (ObjectId.isValid(catId)) {
          const cat = await this.productCategoryRepository.findById(catId);
          if (cat) {
            categoryMap.set(catId, {
              _id: cat._id.toString(),
              name: cat.name,
            });
          }
        }
      })
    );

    const populatedData: PopulatedProduct[] = result.data.map((product) => {
      const cat = categoryMap.get(product.category) || {
        _id: product.category,
        name: 'Unknown Category',
      };

      return {
        _id: product._id.toString(),
        name: product.name,
        description: product.description,
        images: product.images,
        category: cat,
        isRemoved: product.isRemoved,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });

    return {
      data: populatedData,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async getProductById(id: string): Promise<PopulatedProduct> {
    if (!ObjectId.isValid(id)) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Product not found');
    }

    const product = await this.productRepository.findById(id);
    if (!product || product.isRemoved) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Product not found');
    }

    let catData: PopulatedCategory = {
      _id: product.category,
      name: 'Unknown Category',
    };

    if (ObjectId.isValid(product.category)) {
      const cat = await this.productCategoryRepository.findById(product.category);
      if (cat) {
        catData = {
          _id: cat._id.toString(),
          name: cat.name,
        };
      }
    }

    return {
      _id: product._id.toString(),
      name: product.name,
      description: product.description,
      images: product.images,
      category: catData,
      isRemoved: product.isRemoved,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
