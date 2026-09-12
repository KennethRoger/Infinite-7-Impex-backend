"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const mongodb_1 = require("mongodb");
const error_handler_1 = require("../middleware/error-handler");
const http_status_1 = require("../types/http-status");
const error_codes_1 = require("../types/error-codes");
class ProductService {
    constructor(productRepository, productCategoryRepository) {
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
    }
    async validateCategoryExists(categoryId) {
        if (!mongodb_1.ObjectId.isValid(categoryId)) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.BAD_REQUEST, error_codes_1.ERROR_CODES.INVALID_REFERENCE, 'Referenced category does not exist', [{ field: 'category', message: 'No category found with this ID' }]);
        }
        const category = await this.productCategoryRepository.findById(categoryId);
        if (!category || category.isRemoved) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.BAD_REQUEST, error_codes_1.ERROR_CODES.INVALID_REFERENCE, 'Referenced category does not exist', [{ field: 'category', message: 'No category found with this ID' }]);
        }
    }
    async createProduct(dto) {
        await this.validateCategoryExists(dto.category);
        return this.productRepository.create({
            ...dto,
            isRemoved: false,
        });
    }
    async updateProduct(id, dto) {
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Product not found');
        }
        const existing = await this.productRepository.findById(id);
        if (!existing || existing.isRemoved) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Product not found');
        }
        if (dto.category) {
            await this.validateCategoryExists(dto.category);
        }
        const updated = await this.productRepository.update(id, dto);
        if (!updated) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Product not found');
        }
        return updated;
    }
    async deleteProduct(id) {
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Product not found');
        }
        const existing = await this.productRepository.findById(id);
        if (!existing) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Product not found');
        }
        const isDeleted = await this.productRepository.delete(id);
        if (!isDeleted) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, error_codes_1.ERROR_CODES.SERVER_ERROR, 'Failed to delete product');
        }
        return {
            _id: id,
            name: existing.name,
            isRemoved: true,
        };
    }
    async getAllProducts(filters = {}, pagination, sort) {
        const result = await this.productRepository.findFiltered(filters, pagination, sort);
        // Populate category for each product
        const categoryIds = Array.from(new Set(result.data.map((p) => p.category)));
        const categoryMap = new Map();
        await Promise.all(categoryIds.map(async (catId) => {
            if (mongodb_1.ObjectId.isValid(catId)) {
                const cat = await this.productCategoryRepository.findById(catId);
                if (cat) {
                    categoryMap.set(catId, {
                        _id: cat._id.toString(),
                        name: cat.name,
                    });
                }
            }
        }));
        const populatedData = result.data.map((product) => {
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
    async getProductById(id) {
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Product not found');
        }
        const product = await this.productRepository.findById(id);
        if (!product || product.isRemoved) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Product not found');
        }
        let catData = {
            _id: product.category,
            name: 'Unknown Category',
        };
        if (mongodb_1.ObjectId.isValid(product.category)) {
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
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map