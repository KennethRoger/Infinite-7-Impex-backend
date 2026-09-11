import { container } from './container';
import { Database } from '../config/database';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';

export function initializeDI() {
  container.register('database', () => Database.getInstance(), true);
  
  container.register('userRepository', () => {
    const db = container.resolve<Database>('database').getDb();
    return new UserRepository(db);
  }, true);
  
  container.register('userService', () => {
    const userRepository = container.resolve<UserRepository>('userRepository');
    return new UserService(userRepository);
  }, true);
  
  container.register('userController', () => {
    const userService = container.resolve<UserService>('userService');
    return new UserController(userService);
  }, true);
}

export { container };