import { Request, Response, NextFunction } from 'express';
import { BlogService } from '../services/blog.service';
import {
  CreateBlogSchema,
  UpdateBlogSchema,
  BlogQueryFilters,
} from '../models/blog.model';
import { createSuccessResponse } from '../utils/response-helpers';
import { HTTP_STATUS } from '../types/http-status';
import { PaginationOptions, SortOptions } from '../types/common';

export class BlogController {
  constructor(private blogService: BlogService) {}

  async createBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = CreateBlogSchema.parse(req.body);
      const blog = await this.blogService.createBlog(validatedData);

      res.status(HTTP_STATUS.CREATED).json(
        createSuccessResponse(
          blog,
          `Blog '${blog.title}' was created successfully`
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async updateBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      const validatedData = UpdateBlogSchema.parse(req.body);
      const updatedBlog = await this.blogService.updateBlog(id, validatedData);

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(updatedBlog, 'Blog updated successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      const result = await this.blogService.deleteBlog(id);

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(
          null,
          `Blog '${result.title}' was deleted successfully`
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllBlogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = Math.max(1, parseInt(req.query['page'] as string, 10) || 1);
      const limit = Math.max(1, Math.min(100, parseInt(req.query['limit'] as string, 10) || 10));
      const sortBy = (req.query['sortBy'] as string) || 'createdAt';
      const sortOrder = req.query['sortOrder'] === 'asc' ? 'asc' : 'desc';

      const pagination: PaginationOptions = { page, limit };
      const sort: SortOptions = { field: sortBy, order: sortOrder };

      const filters: BlogQueryFilters = {};
      if (typeof req.query['title'] === 'string' && req.query['title'].trim() !== '') {
        filters.title = req.query['title'].trim();
      }

      const result = await this.blogService.getAllBlogs(filters, pagination, sort);

      res.setHeader('X-Total-Count', result.total.toString());
      res.setHeader('X-Page', result.page.toString());
      res.setHeader('X-Limit', result.limit.toString());
      res.setHeader('X-Total-Pages', result.totalPages.toString());

      const responseData = req.query['paginated'] === 'true' ? result : result.data;

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(responseData, 'Blogs fetched successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  async getBlogById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      const blog = await this.blogService.getBlogById(id);

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(blog, 'Blog fetched successfully')
      );
    } catch (error) {
      next(error);
    }
  }
}
