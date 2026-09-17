"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const database_1 = require("./config/database");
const di_1 = require("./di");
const error_handler_1 = require("./middleware/error-handler");
const rate_limiter_1 = require("./middleware/rate-limiter");
const response_helpers_1 = require("./utils/response-helpers");
const customer_routes_1 = require("./routes/customer.routes");
const auth_routes_1 = require("./routes/auth.routes");
const product_category_routes_1 = require("./routes/product-category.routes");
const product_routes_1 = require("./routes/product.routes");
const blog_routes_1 = require("./routes/blog.routes");
const upload_routes_1 = require("./routes/upload.routes");
const http_status_1 = require("./types/http-status");
const app = (0, express_1.default)();
const PORT = config_1.config.port;
// Global Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    next();
});
app.use(rate_limiter_1.globalRateLimiter);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Basic routes
app.get('/', (_req, res) => {
    res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)({ message: 'Welcome to Infinite 7 Impex API' }, 'API is running'));
});
app.get('/health', (_req, res) => {
    const db = database_1.Database.getInstance();
    const healthData = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: db.isConnected() ? 'connected' : 'disconnected'
    };
    res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(healthData, 'Health check successful'));
});
// Initialize application
async function startServer() {
    try {
        // Connect to database
        const database = database_1.Database.getInstance();
        await database.connect(config_1.config.mongo.connectionString, config_1.config.mongo.dbName);
        // Initialize dependency injection
        (0, di_1.initializeDI)();
        // Register routes
        const authController = di_1.container.resolve('authController');
        const authRoutes = (0, auth_routes_1.createAuthRoutes)(authController);
        app.use('/auth', authRoutes);
        app.use('/api/auth', authRoutes);
        const customerController = di_1.container.resolve('customerController');
        const customerRoutes = (0, customer_routes_1.createCustomerRoutes)(customerController);
        app.use('/customers', customerRoutes);
        app.use('/api/customers', customerRoutes);
        const productCategoryController = di_1.container.resolve('productCategoryController');
        const categoryRoutes = (0, product_category_routes_1.createProductCategoryRoutes)(productCategoryController);
        app.use('/categories', categoryRoutes);
        app.use('/api/categories', categoryRoutes);
        const productController = di_1.container.resolve('productController');
        const productRoutes = (0, product_routes_1.createProductRoutes)(productController);
        app.use('/products', productRoutes);
        app.use('/api/products', productRoutes);
        const blogController = di_1.container.resolve('blogController');
        const blogRoutes = (0, blog_routes_1.createBlogRoutes)(blogController);
        app.use('/blogs', blogRoutes);
        app.use('/api/blogs', blogRoutes);
        const uploadRoutes = (0, upload_routes_1.createUploadRoutes)();
        app.use('/upload', uploadRoutes);
        app.use('/api/upload', uploadRoutes);
        // 404 handler (must be after all routes)
        app.use((_req, res) => {
            res.status(http_status_1.HTTP_STATUS.NOT_FOUND).json((0, response_helpers_1.createNotFoundResponse)('Route not found'));
        });
        // Error handling middleware (must be last)
        app.use(error_handler_1.errorHandler);
        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Health check available at http://localhost:${PORT}/health`);
            console.log(`Auth API available at http://localhost:${PORT}/auth`);
            console.log(`Customer API available at http://localhost:${PORT}/customers`);
            console.log(`Categories API available at http://localhost:${PORT}/categories`);
            console.log(`Products API available at http://localhost:${PORT}/products`);
            console.log(`Blogs API available at http://localhost:${PORT}/blogs`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully...');
    const database = database_1.Database.getInstance();
    await database.disconnect();
    process.exit(0);
});
process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully...');
    const database = database_1.Database.getInstance();
    await database.disconnect();
    process.exit(0);
});
startServer();
//# sourceMappingURL=index.js.map