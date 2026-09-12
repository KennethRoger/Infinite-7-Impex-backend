import { container } from './container';
import { Database } from '../config/database';
import { ProductCategoryRepository } from '../repositories/product-category.repository';
import { ProductRepository } from '../repositories/product.repository';
import { CustomerRepository } from '../repositories/customer.repository';
import { BlogRepository } from '../repositories/blog.repository';
import { AdminRepository } from '../repositories/admin.repository';
import { EmailService } from '../services/email.service';
import { CustomerService } from '../services/customer.service';
import { AuthService } from '../services/auth.service';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductService } from '../services/product.service';
import { CustomerController } from '../controllers/customer.controller';
import { AuthController } from '../controllers/auth.controller';
import { ProductCategoryController } from '../controllers/product-category.controller';
import { ProductController } from '../controllers/product.controller';

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

  container.register('adminRepository', () => {
    const db = container.resolve<Database>('database').getDb();
    return new AdminRepository(db);
  }, true);

  // Services
  container.register('emailService', () => new EmailService(), true);

  container.register('customerService', () => {
    const customerRepository = container.resolve<CustomerRepository>('customerRepository');
    const emailService = container.resolve<EmailService>('emailService');
    return new CustomerService(customerRepository, emailService);
  }, true);

  container.register('authService', () => {
    const adminRepository = container.resolve<AdminRepository>('adminRepository');
    return new AuthService(adminRepository);
  }, true);

  container.register('productCategoryService', () => {
    const productCategoryRepository = container.resolve<ProductCategoryRepository>(
      'productCategoryRepository'
    );
    return new ProductCategoryService(productCategoryRepository);
  }, true);

  container.register('productService', () => {
    const productRepository = container.resolve<ProductRepository>('productRepository');
    const productCategoryRepository = container.resolve<ProductCategoryRepository>(
      'productCategoryRepository'
    );
    return new ProductService(productRepository, productCategoryRepository);
  }, true);

  // Controllers
  container.register('customerController', () => {
    const customerService = container.resolve<CustomerService>('customerService');
    return new CustomerController(customerService);
  }, true);

  container.register('authController', () => {
    const authService = container.resolve<AuthService>('authService');
    return new AuthController(authService);
  }, true);

  container.register('productCategoryController', () => {
    const productCategoryService = container.resolve<ProductCategoryService>(
      'productCategoryService'
    );
    return new ProductCategoryController(productCategoryService);
  }, true);

  container.register('productController', () => {
    const productService = container.resolve<ProductService>('productService');
    return new ProductController(productService);
  }, true);
}

export { container };