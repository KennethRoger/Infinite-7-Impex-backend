import { WithId } from 'mongodb';
import { ProductRepository } from '../repositories/product.repository';
import { ProductCategoryRepository } from '../repositories/product-category.repository';
import { Product, CreateProductDto, UpdateProductDto, ProductQueryFilters, PopulatedProduct } from '../models/product.model';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';
export declare class ProductService {
    private productRepository;
    private productCategoryRepository;
    constructor(productRepository: ProductRepository, productCategoryRepository: ProductCategoryRepository);
    private validateCategoryExists;
    createProduct(dto: CreateProductDto): Promise<WithId<Product>>;
    updateProduct(id: string, dto: UpdateProductDto): Promise<WithId<Product>>;
    deleteProduct(id: string): Promise<{
        _id: string;
        name: string;
        isRemoved: true;
    }>;
    getAllProducts(filters?: ProductQueryFilters, pagination?: PaginationOptions, sort?: SortOptions): Promise<PaginatedResult<PopulatedProduct>>;
    getProductById(id: string): Promise<PopulatedProduct>;
}
//# sourceMappingURL=product.service.d.ts.map