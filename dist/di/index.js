"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
exports.initializeDI = initializeDI;
const container_1 = require("./container");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return container_1.container; } });
const database_1 = require("../config/database");
const product_category_repository_1 = require("../repositories/product-category.repository");
const product_repository_1 = require("../repositories/product.repository");
const customer_repository_1 = require("../repositories/customer.repository");
const blog_repository_1 = require("../repositories/blog.repository");
function initializeDI() {
    container_1.container.register('database', () => database_1.Database.getInstance(), true);
    // Product Category
    container_1.container.register('productCategoryRepository', () => {
        const db = container_1.container.resolve('database').getDb();
        return new product_category_repository_1.ProductCategoryRepository(db);
    }, true);
    // Product
    container_1.container.register('productRepository', () => {
        const db = container_1.container.resolve('database').getDb();
        return new product_repository_1.ProductRepository(db);
    }, true);
    // Customer
    container_1.container.register('customerRepository', () => {
        const db = container_1.container.resolve('database').getDb();
        return new customer_repository_1.CustomerRepository(db);
    }, true);
    // Blog
    container_1.container.register('blogRepository', () => {
        const db = container_1.container.resolve('database').getDb();
        return new blog_repository_1.BlogRepository(db);
    }, true);
}
//# sourceMappingURL=index.js.map