import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

export function createAuthRoutes(authController: AuthController): Router {
  const router = Router();

  router.post('/login', (req, res, next) => authController.login(req, res, next));
  router.post('/logout', (req, res, next) => authController.logout(req, res, next));
  router.get('/me', authenticateAdmin, (req, res, next) => authController.getMe(req, res, next));

  return router;
}
