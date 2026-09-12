"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryService = void 0;
const mongodb_1 = require("mongodb");
const error_handler_1 = require("../middleware/error-handler");
const http_status_1 = require("../types/http-status");
const error_codes_1 = require("../types/error-codes");
class ProductCategoryService {
    constructor(productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }
    async createCategory(dto) {
        const existing = await this.productCategoryRepository.findByName(dto.name);
        if (existing) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.CONFLICT, error_codes_1.ERROR_CODES.DUPLICATE_ENTRY, `Category with name '${dto.name}' already exists`);
        }
        return this.productCategoryRepository.create({
            ...dto,
            isRemoved: false,
        });
    }
    async updateCategory(id, dto) {
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Category not found');
        }
        const existing = await this.productCategoryRepository.findById(id);
        if (!existing || existing.isRemoved) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Category not found');
        }
        if (dto.name && dto.name.trim().toLowerCase() !== existing.name.trim().toLowerCase()) {
            const duplicate = await this.productCategoryRepository.findByName(dto.name);
            if (duplicate && duplicate._id.toString() !== id) {
                throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.CONFLICT, error_codes_1.ERROR_CODES.DUPLICATE_ENTRY, `Category with name '${dto.name}' already exists`);
            }
        }
        const updated = await this.productCategoryRepository.update(id, dto);
        if (!updated) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Category not found');
        }
        return updated;
    }
    async deleteCategory(id) {
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Category not found');
        }
        const existing = await this.productCategoryRepository.findById(id);
        if (!existing) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Category not found');
        }
        const isDeleted = await this.productCategoryRepository.delete(id);
        if (!isDeleted) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, error_codes_1.ERROR_CODES.SERVER_ERROR, 'Failed to delete category');
        }
        return {
            _id: id,
            name: existing.name,
            isRemoved: true,
        };
    }
    async getAllCategories(filters = {}, pagination, sort) {
        return this.productCategoryRepository.findFiltered(filters, pagination, sort);
    }
    async getCategoryById(id) {
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Category not found');
        }
        const category = await this.productCategoryRepository.findById(id);
        if (!category || category.isRemoved) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Category not found');
        }
        return category;
    }
}
exports.ProductCategoryService = ProductCategoryService;
//# sourceMappingURL=product-category.service.js.map