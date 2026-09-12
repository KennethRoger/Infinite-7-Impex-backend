import { ObjectId, WithId } from 'mongodb';
import { BlogRepository } from '../repositories/blog.repository';
import {
  Blog,
  CreateBlogDto,
  UpdateBlogDto,
  BlogQueryFilters,
  BlogSummary,
} from '../models/blog.model';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';
import { AppError } from '../middleware/error-handler';
import { HTTP_STATUS } from '../types/http-status';
import { ERROR_CODES } from '../types/error-codes';

export class BlogService {
  constructor(private blogRepository: BlogRepository) {}

  async createBlog(dto: CreateBlogDto): Promise<WithId<Blog>> {
    return this.blogRepository.create(dto);
  }

  async updateBlog(id: string, dto: UpdateBlogDto): Promise<WithId<Blog>> {
    if (!ObjectId.isValid(id)) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Blog not found');
    }

    const existing = await this.blogRepository.findById(id);
    if (!existing) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Blog not found');
    }

    const updated = await this.blogRepository.update(id, dto);
    if (!updated) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Blog not found');
    }

    return updated;
  }

  async deleteBlog(id: string): Promise<{ title: string }> {
    if (!ObjectId.isValid(id)) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Blog not found');
    }

    const existing = await this.blogRepository.findById(id);
    if (!existing) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Blog not found');
    }

    const isDeleted = await this.blogRepository.delete(id);
    if (!isDeleted) {
      throw new AppError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_CODES.SERVER_ERROR,
        'Failed to delete blog'
      );
    }

    return { title: existing.title };
  }

  async getAllBlogs(
    filters: BlogQueryFilters = {},
    pagination?: PaginationOptions,
    sort?: SortOptions
  ): Promise<PaginatedResult<BlogSummary>> {
    const result = await this.blogRepository.findFiltered(filters, pagination, sort);

    // List view omits sections for a lighter payload per specification
    const summaries: BlogSummary[] = result.data.map((blog) => ({
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

  async getBlogById(id: string): Promise<WithId<Blog>> {
    if (!ObjectId.isValid(id)) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Blog not found');
    }

    const blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Blog not found');
    }

    return blog;
  }
}
