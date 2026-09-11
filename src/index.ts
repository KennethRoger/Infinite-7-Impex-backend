import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { config } from './config';
import { Database } from './config/database';
import { initializeDI, container } from './di';
import { errorHandler } from './middleware/error-handler';
import { createSuccessResponse, createNotFoundResponse } from './utils/response-helpers';
import { CustomerController } from './controllers/customer.controller';
import { createCustomerRoutes } from './routes/customer.routes';
import { HTTP_STATUS } from './types/http-status';

const app = express();
const PORT = config.port;

// Middleware
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
    const customerController = container.resolve<CustomerController>('customerController');
    const customerRoutes = createCustomerRoutes(customerController);
    app.use('/customers', customerRoutes);
    app.use('/api/customers', customerRoutes);

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
      console.log(`Customer API available at http://localhost:${PORT}/customers`);
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