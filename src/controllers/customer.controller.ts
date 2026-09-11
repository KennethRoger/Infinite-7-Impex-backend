import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../services/customer.service';
import {
  CreateCustomerSchema,
  UpdateCustomerPrioritySchema,
  CustomerPriority,
  CustomerQueryFilters,
} from '../models/customer.model';
import { createSuccessResponse } from '../utils/response-helpers';
import { HTTP_STATUS } from '../types/http-status';
import { PaginationOptions, SortOptions } from '../types/common';

export class CustomerController {
  constructor(private customerService: CustomerService) {}

  async createCustomer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = CreateCustomerSchema.parse(req.body);
      const customer = await this.customerService.createCustomer(validatedData);

      res.status(HTTP_STATUS.CREATED).json(
        createSuccessResponse(
          customer,
          `Customer ${customer.fullName} was added successfully`
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllCustomers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = Math.max(1, parseInt(req.query['page'] as string, 10) || 1);
      const limit = Math.max(1, Math.min(100, parseInt(req.query['limit'] as string, 10) || 10));
      const sortBy = (req.query['sortBy'] as string) || 'createdAt';
      const sortOrder = req.query['sortOrder'] === 'asc' ? 'asc' : 'desc';

      const pagination: PaginationOptions = { page, limit };
      const sort: SortOptions = { field: sortBy, order: sortOrder };

      const filters: CustomerQueryFilters = {};

      if (typeof req.query['fullName'] === 'string' && req.query['fullName'].trim() !== '') {
        filters.fullName = req.query['fullName'].trim();
      }

      if (typeof req.query['email'] === 'string' && req.query['email'].trim() !== '') {
        filters.email = req.query['email'].trim();
      }

      if (typeof req.query['country'] === 'string' && req.query['country'].trim() !== '') {
        filters.country = req.query['country'].trim();
      }

      if (typeof req.query['priority'] === 'string' && req.query['priority'].trim() !== '') {
        filters.priority = req.query['priority'].trim() as CustomerPriority;
      }

      if (typeof req.query['notes'] === 'string' && req.query['notes'].trim() !== '') {
        filters.notes = req.query['notes'].trim();
      }

      if (req.query['isActive'] !== undefined) {
        filters.isActive = req.query['isActive'] === 'true';
      }

      const result = await this.customerService.getAllCustomers(filters, pagination, sort);

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(result, 'Customers retrieved successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  async getCustomerById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      const customer = await this.customerService.getCustomerById(id);

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(customer, 'Customer retrieved successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  async updatePriority(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      const { priority } = UpdateCustomerPrioritySchema.parse(req.body);
      const updatedCustomer = await this.customerService.updateCustomerPriority(id, priority);

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(updatedCustomer, 'Customer priority updated successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteCustomer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params['id'] as string;
      await this.customerService.deleteCustomer(id);

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(null, 'Customer deleted successfully')
      );
    } catch (error) {
      next(error);
    }
  }
}
