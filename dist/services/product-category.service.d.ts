import { WithId } from 'mongodb';
import { ProductCategoryRepository } from '../repositories/product-category.repository';
import { ProductRepository } from '../repositories/product.repository';
import { ProductCategory, CreateProductCategoryDto, UpdateProductCategoryDto, ProductCategoryQueryFilters } from '../models/product-category.model';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';
export declare class ProductCategoryService {
    private productCategoryRepository;
    private productRepository?;
    constructor(productCategoryRepository: ProductCategoryRepository, productRepository?: ProductRepository | undefined);
    createCategory(dto: CreateProductCategoryDto): Promise<WithId<ProductCategory>>;
    updateCategory(id: string, dto: UpdateProductCategoryDto): Promise<WithId<ProductCategory>>;
    deleteCategory(id: string): Promise<{
        _id: string;
        name: string;
        isRemoved: true;
    }>;
    getAllCategories(filters?: ProductCategoryQueryFilters, pagination?: PaginationOptions, sort?: SortOptions): Promise<PaginatedResult<WithId<ProductCategory>>>;
    getCategoryById(id: string): Promise<WithId<ProductCategory>>;
}
//# sourceMappingURL=product-category.service.d.ts.map