"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const mongodb_1 = require("mongodb");
const error_handler_1 = require("../middleware/error-handler");
const http_status_1 = require("../types/http-status");
const error_codes_1 = require("../types/error-codes");
class BlogService {
    constructor(blogRepository) {
        this.blogRepository = blogRepository;
    }
    async createBlog(dto) {
        return this.blogRepository.create(dto);
    }
    async updateBlog(id, dto) {
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Blog not found');
        }
        const existing = await this.blogRepository.findById(id);
        if (!existing) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Blog not found');
        }
        const updated = await this.blogRepository.update(id, dto);
        if (!updated) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Blog not found');
        }
        return updated;
    }
    async deleteBlog(id) {
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Blog not found');
        }
        const existing = await this.blogRepository.findById(id);
        if (!existing) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Blog not found');
        }
        const isDeleted = await this.blogRepository.delete(id);
        if (!isDeleted) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, error_codes_1.ERROR_CODES.SERVER_ERROR, 'Failed to delete blog');
        }
        return { title: existing.title };
    }
    async getAllBlogs(filters = {}, pagination, sort) {
        const result = await this.blogRepository.findFiltered(filters, pagination, sort);
        // List view omits sections for a lighter payload per specification
        const summaries = result.data.map((blog) => ({
            _id: blog._id.toString(),
            title: blog.title,
            description: blog.description,
            image: blog.image,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
        }));
        return {
            data: summaries,
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
        };
    }
    async getBlogById(id) {
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Blog not found');
        }
        const blog = await this.blogRepository.findById(id);
        if (!blog) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Blog not found');
        }
        return blog;
    }
}
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map