import { container } from './container';
import { Database } from '../config/database';
import { ProductCategoryRepository } from '../repositories/product-category.repository';
import { ProductRepository } from '../repositories/product.repository';
import { CustomerRepository } from '../repositories/customer.repository';
import { BlogRepository } from '../repositories/blog.repository';

export function initializeDI() {
  container.register('database', () => Database.getInstance(), true);
  
  // Product Category
  container.register('productCategoryRepository', () => {
    const db = container.resolve<Database>('database').getDb();
    return new ProductCategoryRepository(db);
  }, true);
  
  // Product
  container.register('productRepository', () => {
    const db = container.resolve<Database>('database').getDb();
    return new ProductRepository(db);
  }, true);
  
  // Customer
  container.register('customerRepository', () => {
    const db = container.resolve<Database>('database').getDb();
    return new CustomerRepository(db);
  }, true);
  
  // Blog
  container.register('blogRepository', () => {
    const db = container.resolve<Database>('database').getDb();
    return new BlogRepository(db);
  }, true);
}

export { container };