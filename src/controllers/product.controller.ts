import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import {
  CreateProductSchema,
  UpdateProductSchema,
  ProductQueryFilters,
} from '../models/product.model';
import { createSuccessResponse } from '../utils/response-helpers';
import { HTTP_STATUS } from '../types/http-status';
import { PaginationOptions, SortOptions } from '../types/common';

export class ProductController {
  constructor(private productService: ProductService) {}

  async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = CreateProductSchema.parse(req.body);
      const product = await this.productService.createProduct(validatedData);

      res.status(HTTP_STATUS.CREATED).json(
        createSuccessResponse(
          product,
          `Product '${product.name}' was created successfully`
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      const validatedData = UpdateProductSchema.parse(req.body);
      const updatedProduct = await this.productService.updateProduct(id, validatedData);

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(updatedProduct, 'Product updated successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      const result = await this.productService.deleteProduct(id);

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(
          { _id: result._id, isRemoved: true },
          `Product '${result.name}' was removed successfully`
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = Math.max(1, parseInt(req.query['page'] as string, 10) || 1);
      const limit = Math.max(1, Math.min(100, parseInt(req.query['limit'] as string, 10) || 10));
      const sortBy = (req.query['sortBy'] as string) || 'createdAt';
      const sortOrder = req.query['sortOrder'] === 'asc' ? 'asc' : 'desc';

      const pagination: PaginationOptions = { page, limit };
      const sort: SortOptions = { field: sortBy, order: sortOrder };

      const filters: ProductQueryFilters = {};
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

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(responseData, 'Products fetched successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      const product = await this.productService.getProductById(id);

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(product, 'Product fetched successfully')
      );
    } catch (error) {
      next(error);
    }
  }
}
