import { Router } from 'express';
import { ProductCategoryController } from '../controllers/product-category.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

export function createProductCategoryRoutes(
  productCategoryController: ProductCategoryController
): Router {
  const router = Router();

  // User side / Public routes
  router.get('/', (req, res, next) =>
    productCategoryController.getAllCategories(req, res, next)
  );

  router.get('/:id', (req, res, next) =>
    productCategoryController.getCategoryById(req, res, next)
  );

  // Admin routes (Protected by JWT authentication)
  router.post('/', authenticateAdmin, (req, res, next) =>
    productCategoryController.createCategory(req, res, next)
  );

  router.put('/:id', authenticateAdmin, (req, res, next) =>
    productCategoryController.updateCategory(req, res, next)
  );

  router.delete('/:id', authenticateAdmin, (req, res, next) =>
    productCategoryController.deleteCategory(req, res, next)
  );

  return router;
}
