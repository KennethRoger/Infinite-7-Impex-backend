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
const admin_repository_1 = require("../repositories/admin.repository");
const email_service_1 = require("../services/email.service");
const customer_service_1 = require("../services/customer.service");
const auth_service_1 = require("../services/auth.service");
const customer_controller_1 = require("../controllers/customer.controller");
const auth_controller_1 = require("../controllers/auth.controller");
function initializeDI() {
    container_1.container.register('database', () => database_1.Database.getInstance(), true);
    // Repositories
    container_1.container.register('productCategoryRepository', () => {
        const db = container_1.container.resolve('database').getDb();
        return new product_category_repository_1.ProductCategoryRepository(db);
    }, true);
    container_1.container.register('productRepository', () => {
        const db = container_1.container.resolve('database').getDb();
        return new product_repository_1.ProductRepository(db);
    }, true);
    container_1.container.register('customerRepository', () => {
        const db = container_1.container.resolve('database').getDb();
        return new customer_repository_1.CustomerRepository(db);
    }, true);
    container_1.container.register('blogRepository', () => {
        const db = container_1.container.resolve('database').getDb();
        return new blog_repository_1.BlogRepository(db);
    }, true);
    container_1.container.register('adminRepository', () => {
        const db = container_1.container.resolve('database').getDb();
        return new admin_repository_1.AdminRepository(db);
    }, true);
    // Services
    container_1.container.register('emailService', () => new email_service_1.EmailService(), true);
    container_1.container.register('customerService', () => {
        const customerRepository = container_1.container.resolve('customerRepository');
        const emailService = container_1.container.resolve('emailService');
        return new customer_service_1.CustomerService(customerRepository, emailService);
    }, true);
    container_1.container.register('authService', () => {
        const adminRepository = container_1.container.resolve('adminRepository');
        return new auth_service_1.AuthService(adminRepository);
    }, true);
    // Controllers
    container_1.container.register('customerController', () => {
        const customerService = container_1.container.resolve('customerService');
        return new customer_controller_1.CustomerController(customerService);
    }, true);
    container_1.container.register('authController', () => {
        const authService = container_1.container.resolve('authService');
        return new auth_controller_1.AuthController(authService);
    }, true);
}
//# sourceMappingURL=index.js.map