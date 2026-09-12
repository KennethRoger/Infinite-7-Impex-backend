"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryController = void 0;
const product_category_model_1 = require("../models/product-category.model");
const response_helpers_1 = require("../utils/response-helpers");
const http_status_1 = require("../types/http-status");
class ProductCategoryController {
    constructor(productCategoryService) {
        this.productCategoryService = productCategoryService;
    }
    async createCategory(req, res, next) {
        try {
            const validatedData = product_category_model_1.CreateProductCategorySchema.parse(req.body);
            const category = await this.productCategoryService.createCategory(validatedData);
            res.status(http_status_1.HTTP_STATUS.CREATED).json((0, response_helpers_1.createSuccessResponse)(category, `Category '${category.name}' was created successfully`));
        }
        catch (error) {
            next(error);
        }
    }
    async updateCategory(req, res, next) {
        try {
            const id = req.params['id'];
            const validatedData = product_category_model_1.UpdateProductCategorySchema.parse(req.body);
            const updatedCategory = await this.productCategoryService.updateCategory(id, validatedData);
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(updatedCategory, 'Category updated successfully'));
        }
        catch (error) {
            next(error);
        }
    }
    async deleteCategory(req, res, next) {
        try {
            const id = req.params['id'];
            const result = await this.productCategoryService.deleteCategory(id);
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)({ _id: result._id, isRemoved: true }, `Category '${result.name}' was removed successfully`));
        }
        catch (error) {
            next(error);
        }
    }
    async getAllCategories(req, res, next) {
        try {
            const page = Math.max(1, parseInt(req.query['page'], 10) || 1);
            const limit = Math.max(1, Math.min(100, parseInt(req.query['limit'], 10) || 10));
            const sortBy = req.query['sortBy'] || 'createdAt';
            const sortOrder = req.query['sortOrder'] === 'asc' ? 'asc' : 'desc';
            const pagination = { page, limit };
            const sort = { field: sortBy, order: sortOrder };
            const filters = {};
            if (typeof req.query['name'] === 'string' && req.query['name'].trim() !== '') {
                filters.name = req.query['name'].trim();
            }
            const result = await this.productCategoryService.getAllCategories(filters, pagination, sort);
            res.setHeader('X-Total-Count', result.total.toString());
            res.setHeader('X-Page', result.page.toString());
            res.setHeader('X-Limit', result.limit.toString());
            res.setHeader('X-Total-Pages', result.totalPages.toString());
            const responseData = req.query['paginated'] === 'true' ? result : result.data;
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(responseData, 'Categories fetched successfully'));
        }
        catch (error) {
            next(error);
        }
    }
    async getCategoryById(req, res, next) {
        try {
            const id = req.params['id'];
            const category = await this.productCategoryService.getCategoryById(id);
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(category, 'Category fetched successfully'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProductCategoryController = ProductCategoryController;
//# sourceMappingURL=product-category.controller.js.map