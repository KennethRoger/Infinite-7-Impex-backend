import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export function createUserRoutes(userController: UserController): Router {
  const router = Router();

  router.get('/', (req, res, next) => userController.getAllUsers(req, res, next));
  router.get('/:id', (req, res, next) => userController.getUserById(req, res, next));
  router.post('/', (req, res, next) => userController.createUser(req, res, next));
  router.put('/:id', (req, res, next) => userController.updateUser(req, res, next));
  router.delete('/:id', (req, res, next) => userController.deleteUser(req, res, next));

  return router;
}