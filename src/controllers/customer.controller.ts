import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../services/customer.service';
import { CreateCustomerSchema } from '../models/customer.model';
import { createSuccessResponse } from '../utils/response-helpers';
import { HTTP_STATUS } from '../types/http-status';

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
}
