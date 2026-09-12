import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

export function createProductRoutes(productController: ProductController): Router {
  const router = Router();

  // User side / Public routes
  router.get('/', (req, res, next) => productController.getAllProducts(req, res, next));
  router.get('/:id', (req, res, next) => productController.getProductById(req, res, next));

  // Admin routes (Protected by JWT authentication)
  router.post('/', authenticateAdmin, (req, res, next) =>
    productController.createProduct(req, res, next)
  );
  router.put('/:id', authenticateAdmin, (req, res, next) =>
    productController.updateProduct(req, res, next)
  );
  router.delete('/:id', authenticateAdmin, (req, res, next) =>
    productController.deleteProduct(req, res, next)
  );

  return router;
}
