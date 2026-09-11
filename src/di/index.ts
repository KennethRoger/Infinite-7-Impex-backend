import { container } from './container';
import { Database } from '../config/database';
import { ProductCategoryRepository } from '../repositories/product-category.repository';
import { ProductRepository } from '../repositories/product.repository';
import { CustomerRepository } from '../repositories/customer.repository';
import { BlogRepository } from '../repositories/blog.repository';
import { EmailService } from '../services/email.service';
import { CustomerService } from '../services/customer.service';
import { CustomerController } from '../controllers/customer.controller';

export function initializeDI() {
  container.register('database', () => Database.getInstance(), true);
  
  // Repositories
  container.register('productCategoryRepository', () => {
    const db = container.resolve<Database>('database').getDb();
    return new ProductCategoryRepository(db);
  }, true);
  
  container.register('productRepository', () => {
    const db = container.resolve<Database>('database').getDb();
    return new ProductRepository(db);
  }, true);
  
  container.register('customerRepository', () => {
    const db = container.resolve<Database>('database').getDb();
    return new CustomerRepository(db);
  }, true);
  
  container.register('blogRepository', () => {
    const db = container.resolve<Database>('database').getDb();
    return new BlogRepository(db);
  }, true);

  // Services
  container.register('emailService', () => new EmailService(), true);

  container.register('customerService', () => {
    const customerRepository = container.resolve<CustomerRepository>('customerRepository');
    const emailService = container.resolve<EmailService>('emailService');
    return new CustomerService(customerRepository, emailService);
  }, true);

  // Controllers
  container.register('customerController', () => {
    const customerService = container.resolve<CustomerService>('customerService');
    return new CustomerController(customerService);
  }, true);
}

export { container };