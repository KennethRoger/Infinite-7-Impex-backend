import express, { Request, Response, NextFunction } from 'express';
import { config } from './config';
import { Database } from './config/database';
import { initializeDI } from './di';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = config.port;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  
  if (err.message.includes('not found')) {
    res.status(404).json({ error: err.message });
  } else if (err.message.includes('Validation error')) {
    res.status(400).json({ error: err.message });
  } else if (err.message.includes('already exists')) {
    res.status(409).json({ error: err.message });
  } else {
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Basic routes
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to Infinite 7 Impex API' });
});

app.get('/health', (_req: Request, res: Response) => {
  const db = Database.getInstance();
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: db.isConnected() ? 'connected' : 'disconnected'
  });
});

// Initialize application
async function startServer() {
  try {
    // Connect to database
    const database = Database.getInstance();
    await database.connect(config.mongo.connectionString, config.mongo.dbName);

    // Initialize dependency injection
    initializeDI();

    // Routes will be registered here when services are implemented

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check available at http://localhost:${PORT}/health`);
      console.log(`API available at http://localhost:${PORT}/api`);
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