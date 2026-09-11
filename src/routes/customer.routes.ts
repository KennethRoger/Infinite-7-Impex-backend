import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';

export function createCustomerRoutes(customerController: CustomerController): Router {
  const router = Router();

  router.post('/', (req, res, next) => customerController.createCustomer(req, res, next));

  return router;
}
