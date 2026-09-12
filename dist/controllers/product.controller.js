"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_model_1 = require("../models/product.model");
const response_helpers_1 = require("../utils/response-helpers");
const http_status_1 = require("../types/http-status");
class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProduct(req, res, next) {
        try {
            const validatedData = product_model_1.CreateProductSchema.parse(req.body);
            const product = await this.productService.createProduct(validatedData);
            res.status(http_status_1.HTTP_STATUS.CREATED).json((0, response_helpers_1.createSuccessResponse)(product, `Product '${product.name}' was created successfully`));
        }
        catch (error) {
            next(error);
        }
    }
    async updateProduct(req, res, next) {
        try {
            const id = req.params['id'];
            const validatedData = product_model_1.UpdateProductSchema.parse(req.body);
            const updatedProduct = await this.productService.updateProduct(id, validatedData);
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(updatedProduct, 'Product updated successfully'));
        }
        catch (error) {
            next(error);
        }
    }
    async deleteProduct(req, res, next) {
        try {
            const id = req.params['id'];
            const result = await this.productService.deleteProduct(id);
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)({ _id: result._id, isRemoved: true }, `Product '${result.name}' was removed successfully`));
        }
        catch (error) {
            next(error);
        }
    }
    async getAllProducts(req, res, next) {
        try {
            const page = Math.max(1, parseInt(req.query['page'], 10) || 1);
            const limit = Math.max(1, Math.min(100, parseInt(req.query['limit'], 10) || 10));
            const sortBy = req.query['sortBy'] || 'createdAt';
            const sortOrder = req.query['sortOrder'] === 'asc' ? 'asc' : 'desc';
            const pagination = { page, limit };
            const sort = { field: sortBy, order: sortOrder };
            const filters = {};
            if (typeof req.query['category'] === 'string' && req.query['category'].trim() !== '') {
                filters.category = req.query['category'].trim();
            }
            if (typeof req.query['name'] === 'string' && req.query['name'].trim() !== '') {
                filters.name = req.query['name'].trim();
            }
            const result = await this.productService.getAllProducts(filters, pagination, sort);
            res.setHeader('X-Total-Count', result.total.toString());
            res.setHeader('X-Page', result.page.toString());
            res.setHeader('X-Limit', result.limit.toString());
            res.setHeader('X-Total-Pages', result.totalPages.toString());
            const responseData = req.query['paginated'] === 'true' ? result : result.data;
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(responseData, 'Products fetched successfully'));
        }
        catch (error) {
            next(error);
        }
    }
    async getProductById(req, res, next) {
        try {
            const id = req.params['id'];
            const product = await this.productService.getProductById(id);
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(product, 'Product fetched successfully'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map