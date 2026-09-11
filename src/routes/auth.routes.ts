import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export function createAuthRoutes(authController: AuthController): Router {
  const router = Router();

  router.post('/login', (req, res, next) => authController.login(req, res, next));
  router.post('/logout', (req, res, next) => authController.logout(req, res, next));

  return router;
}
