import { Router } from 'express';
import { BlogController } from '../controllers/blog.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';
import { publicCache } from '../middleware/cache-control';

export function createBlogRoutes(blogController: BlogController): Router {
  const router = Router();

  // User side / Public routes (SEO friendly)
  router.get('/', publicCache(15), (req, res, next) => blogController.getAllBlogs(req, res, next));
  router.get('/:id', publicCache(15), (req, res, next) => blogController.getBlogById(req, res, next));

  // Admin routes (Protected by JWT authentication)
  router.post('/', authenticateAdmin, (req, res, next) =>
    blogController.createBlog(req, res, next)
  );
  router.put('/:id', authenticateAdmin, (req, res, next) =>
    blogController.updateBlog(req, res, next)
  );
  router.delete('/:id', authenticateAdmin, (req, res, next) =>
    blogController.deleteBlog(req, res, next)
  );

  return router;
}
