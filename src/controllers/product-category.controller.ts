import { Request, Response, NextFunction } from 'express';
import { ProductCategoryService } from '../services/product-category.service';
import {
  CreateProductCategorySchema,
  UpdateProductCategorySchema,
  ProductCategoryQueryFilters,
} from '../models/product-category.model';
import { createSuccessResponse } from '../utils/response-helpers';
import { HTTP_STATUS } from '../types/http-status';
import { PaginationOptions, SortOptions } from '../types/common';

export class ProductCategoryController {
  constructor(private productCategoryService: ProductCategoryService) {}

  async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = CreateProductCategorySchema.parse(req.body);
      const category = await this.productCategoryService.createCategory(validatedData);

      res.status(HTTP_STATUS.CREATED).json(
        createSuccessResponse(
          category,
          `Category '${category.name}' was created successfully`
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      const validatedData = UpdateProductCategorySchema.parse(req.body);
      const updatedCategory = await this.productCategoryService.updateCategory(
        id,
        validatedData
      );

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(updatedCategory, 'Category updated successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      const result = await this.productCategoryService.deleteCategory(id);

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(
          { _id: result._id, isRemoved: true },
          `Category '${result.name}' was removed successfully`
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = Math.max(1, parseInt(req.query['page'] as string, 10) || 1);
      const limit = Math.max(1, Math.min(100, parseInt(req.query['limit'] as string, 10) || 10));
      const sortBy = (req.query['sortBy'] as string) || 'createdAt';
      const sortOrder = req.query['sortOrder'] === 'asc' ? 'asc' : 'desc';

      const pagination: PaginationOptions = { page, limit };
      const sort: SortOptions = { field: sortBy, order: sortOrder };

      const filters: ProductCategoryQueryFilters = {};
      if (typeof req.query['name'] === 'string' && req.query['name'].trim() !== '') {
        filters.name = req.query['name'].trim();
      }

      const result = await this.productCategoryService.getAllCategories(
        filters,
        pagination,
        sort
      );

      res.setHeader('X-Total-Count', result.total.toString());
      res.setHeader('X-Page', result.page.toString());
      res.setHeader('X-Limit', result.limit.toString());
      res.setHeader('X-Total-Pages', result.totalPages.toString());

      const responseData = req.query['paginated'] === 'true' ? result : result.data;

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(responseData, 'Categories fetched successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      const category = await this.productCategoryService.getCategoryById(id);

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(category, 'Category fetched successfully')
      );
    } catch (error) {
      next(error);
    }
  }
}
