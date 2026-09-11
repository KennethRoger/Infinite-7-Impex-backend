# Infinite 7 Impex Backend Server

A TypeScript Node.js backend server with MongoDB integration, following a repository + service architecture with dependency injection.

## Architecture

### Folder Structure
```
src/
├── config/          # Configuration files (database, app config)
├── controllers/     # HTTP request handlers
├── di/             # Dependency injection container
├── models/         # Zod schemas and TypeScript types
├── repositories/   # Data access layer (MongoDB operations)
├── routes/         # Express route definitions
├── services/       # Business logic layer
├── types/          # Common TypeScript interfaces
└── index.ts        # Application entry point
```

### Architecture Layers

1. **Controllers** - Handle HTTP requests/responses
2. **Services** - Business logic and validation
3. **Repositories** - Data access (MongoDB operations)
4. **Models** - Zod schemas for type validation
5. **DI Container** - Dependency injection for loose coupling

## Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_CONNECTION_STRING=mongodb://localhost:27017
MONGODB_DB_NAME=infinite7_impex
```

## Available Scripts

```bash
npm run build      # Compile TypeScript to JavaScript
npm start          # Run the compiled server
npm run dev        # Run directly with ts-node
npm run dev:watch  # Run with auto-reload on file changes
```

## API Endpoints

### Health Check
- `GET /health` - Check server and database status

### Users
- `GET /api/users` - Get all users (with pagination and sorting)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### User Schema
```typescript
{
  email: string (required, valid email)
  name: string (required, 2-100 characters)
}
```

### Query Parameters (for GET /api/users)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Field to sort by (default: createdAt)
- `sortOrder` - Sort order: 'asc' or 'desc' (default: 'desc')

## Example Usage

### Create a user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"John Doe"}'
```

### Get all users
```bash
curl http://localhost:3000/api/users?page=1&limit=10&sortBy=name&sortOrder=asc
```

### Get user by ID
```bash
curl http://localhost:3000/api/users/{id}
```

### Update user
```bash
curl -X PUT http://localhost:3000/api/users/{id} \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'
```

### Delete user
```bash
curl -X DELETE http://localhost:3000/api/users/{id}
```

## Adding New Entities

To add a new entity (e.g., Product):

1. **Create Model** (`src/models/product.model.ts`):
```typescript
import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  // ... other fields
});

export type Product = z.infer<typeof ProductSchema>;
export const CreateProductSchema = ProductSchema;
export type CreateProductDto = z.infer<typeof CreateProductSchema>;
export const UpdateProductSchema = ProductSchema.partial();
export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
```

2. **Create Repository** (`src/repositories/product.repository.ts`):
```typescript
import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { Product } from '../models/product.model';

export class ProductRepository extends BaseRepository<Product> {
  constructor(db: Db) {
    super(db, 'products');
  }
  
  // Add custom queries here
}
```

3. **Create Service** (`src/services/product.service.ts`):
```typescript
import { WithId } from 'mongodb';
import { ProductRepository } from '../repositories/product.repository';
import { Product, CreateProductDto, UpdateProductDto } from '../models/product.model';

export class ProductService {
  constructor(private productRepository: ProductRepository) {}
  
  // Implement business logic
}
```

4. **Create Controller** (`src/controllers/product.controller.ts`):
```typescript
import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
  constructor(private productService: ProductService) {}
  
  // Implement HTTP handlers
}
```

5. **Create Routes** (`src/routes/product.routes.ts`):
```typescript
import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

export function createProductRoutes(productController: ProductController): Router {
  const router = Router();
  
  router.get('/', (req, res, next) => productController.getAllProducts(req, res, next));
  // ... other routes
  
  return router;
}
```

6. **Register in DI Container** (`src/di/index.ts`):
```typescript
container.register('productRepository', () => {
  const db = container.resolve<Database>('database').getDb();
  return new ProductRepository(db);
}, true);

container.register('productService', () => {
  const productRepository = container.resolve<ProductRepository>('productRepository');
  return new ProductService(productRepository);
}, true);

container.register('productController', () => {
  const productService = container.resolve<ProductService>('productService');
  return new ProductController(productService);
}, true);
```

7. **Register Routes** (`src/index.ts`):
```typescript
const productController = container.resolve('productController');
app.use('/api/products', createProductRoutes(productController));
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Zod** - Schema validation
- **ts-node** - TypeScript execution
- **dotenv** - Environment variable management

## Features

- ✅ TypeScript with strict type checking
- ✅ MongoDB integration with Repository pattern
- ✅ Service layer for business logic
- ✅ Dependency injection for loose coupling
- ✅ Zod schemas for validation
- ✅ Pagination and sorting support
- ✅ Error handling middleware
- ✅ Graceful shutdown
- ✅ Environment configuration