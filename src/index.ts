import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { config } from './config';
import { Database } from './config/database';
import { initializeDI, container } from './di';
import { errorHandler } from './middleware/error-handler';
import { globalRateLimiter } from './middleware/rate-limiter';
import { createSuccessResponse, createNotFoundResponse } from './utils/response-helpers';
import { CustomerController } from './controllers/customer.controller';
import { createCustomerRoutes } from './routes/customer.routes';
import { AuthController } from './controllers/auth.controller';
import { createAuthRoutes } from './routes/auth.routes';
import { ProductCategoryController } from './controllers/product-category.controller';
import { createProductCategoryRoutes } from './routes/product-category.routes';
import { ProductController } from './controllers/product.controller';
import { createProductRoutes } from './routes/product.routes';
import { BlogController } from './controllers/blog.controller';
import { createBlogRoutes } from './routes/blog.routes';
import { HTTP_STATUS } from './types/http-status';

const app = express();
const PORT = config.port;

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
app.use(globalRateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic routes
app.get('/', (_req, res) => {
  res.status(HTTP_STATUS.OK).json(
    createSuccessResponse({ message: 'Welcome to Infinite 7 Impex API' }, 'API is running')
  );
});

app.get('/health', (_req, res) => {
  const db = Database.getInstance();
  const healthData = { 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: db.isConnected() ? 'connected' : 'disconnected'
  };
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(healthData, 'Health check successful'));
});

// Initialize application
async function startServer() {
  try {
    // Connect to database
    const database = Database.getInstance();
    await database.connect(config.mongo.connectionString, config.mongo.dbName);

    // Initialize dependency injection
    initializeDI();

    // Register routes
    const authController = container.resolve<AuthController>('authController');
    const authRoutes = createAuthRoutes(authController);
    app.use('/auth', authRoutes);
    app.use('/api/auth', authRoutes);

    const customerController = container.resolve<CustomerController>('customerController');
    const customerRoutes = createCustomerRoutes(customerController);
    app.use('/customers', customerRoutes);
    app.use('/api/customers', customerRoutes);

    const productCategoryController = container.resolve<ProductCategoryController>(
      'productCategoryController'
    );
    const categoryRoutes = createProductCategoryRoutes(productCategoryController);
    app.use('/categories', categoryRoutes);
    app.use('/api/categories', categoryRoutes);

    const productController = container.resolve<ProductController>('productController');
    const productRoutes = createProductRoutes(productController);
    app.use('/products', productRoutes);
    app.use('/api/products', productRoutes);

    const blogController = container.resolve<BlogController>('blogController');
    const blogRoutes = createBlogRoutes(blogController);
    app.use('/blogs', blogRoutes);
    app.use('/api/blogs', blogRoutes);

    // 404 handler (must be after all routes)
    app.use((_req, res) => {
      res.status(HTTP_STATUS.NOT_FOUND).json(createNotFoundResponse('Route not found'));
    });

    // Error handling middleware (must be last)
    app.use(errorHandler);

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

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  const database = Database.getInstance();
  await database.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  const database = Database.getInstance();
  await database.disconnect();
  process.exit(0);
});

startServer();