"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const blog_model_1 = require("../models/blog.model");
const response_helpers_1 = require("../utils/response-helpers");
const http_status_1 = require("../types/http-status");
class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    async createBlog(req, res, next) {
        try {
            const validatedData = blog_model_1.CreateBlogSchema.parse(req.body);
            const blog = await this.blogService.createBlog(validatedData);
            res.status(http_status_1.HTTP_STATUS.CREATED).json((0, response_helpers_1.createSuccessResponse)(blog, `Blog '${blog.title}' was created successfully`));
        }
        catch (error) {
            next(error);
        }
    }
    async updateBlog(req, res, next) {
        try {
            const id = req.params['id'];
            const validatedData = blog_model_1.UpdateBlogSchema.parse(req.body);
            const updatedBlog = await this.blogService.updateBlog(id, validatedData);
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(updatedBlog, 'Blog updated successfully'));
        }
        catch (error) {
            next(error);
        }
    }
    async deleteBlog(req, res, next) {
        try {
            const id = req.params['id'];
            const result = await this.blogService.deleteBlog(id);
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(null, `Blog '${result.title}' was deleted successfully`));
        }
        catch (error) {
            next(error);
        }
    }
    async getAllBlogs(req, res, next) {
        try {
            const page = Math.max(1, parseInt(req.query['page'], 10) || 1);
            const limit = Math.max(1, Math.min(100, parseInt(req.query['limit'], 10) || 10));
            const sortBy = req.query['sortBy'] || 'createdAt';
            const sortOrder = req.query['sortOrder'] === 'asc' ? 'asc' : 'desc';
            const pagination = { page, limit };
            const sort = { field: sortBy, order: sortOrder };
            const filters = {};
            if (typeof req.query['title'] === 'string' && req.query['title'].trim() !== '') {
                filters.title = req.query['title'].trim();
            }
            const result = await this.blogService.getAllBlogs(filters, pagination, sort);
            res.setHeader('X-Total-Count', result.total.toString());
            res.setHeader('X-Page', result.page.toString());
            res.setHeader('X-Limit', result.limit.toString());
            res.setHeader('X-Total-Pages', result.totalPages.toString());
            const responseData = req.query['paginated'] === 'true' ? result : result.data;
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(responseData, 'Blogs fetched successfully'));
        }
        catch (error) {
            next(error);
        }
    }
    async getBlogById(req, res, next) {
        try {
            const id = req.params['id'];
            const blog = await this.blogService.getBlogById(id);
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(blog, 'Blog fetched successfully'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.BlogController = BlogController;
//# sourceMappingURL=blog.controller.js.map