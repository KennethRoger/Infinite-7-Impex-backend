import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

export function createCustomerRoutes(customerController: CustomerController): Router {
  const router = Router();

  // Public enquiry route
  router.post('/', (req, res, next) => customerController.createCustomer(req, res, next));

  // Admin routes (protected by JWT authentication)
  router.get('/', authenticateAdmin, (req, res, next) =>
    customerController.getAllCustomers(req, res, next)
  );

  router.get('/:id', authenticateAdmin, (req, res, next) =>
    customerController.getCustomerById(req, res, next)
  );

  router.patch('/:id/priority', authenticateAdmin, (req, res, next) =>
    customerController.updatePriority(req, res, next)
  );

  router.delete('/:id', authenticateAdmin, (req, res, next) =>
    customerController.deleteCustomer(req, res, next)
  );

  return router;
}
