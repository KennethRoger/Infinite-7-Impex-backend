# Infinite 7 Impex Backend Server

A TypeScript Node.js backend server with MongoDB integration, following a repository + service + controller architecture with dependency injection, JWT authentication, and global rate limiting.

## Architecture

### Folder Structure
```
src/
├── config/          # Configuration files (database, app config, mail, JWT, rate limiting)
├── controllers/     # HTTP request handlers (Auth, Customer, ProductCategory, Product, Blog)
├── di/              # Dependency injection container
├── middleware/      # Global error handling, JWT auth, and rate limiting
├── models/          # Zod schemas, DTOs, and TypeScript types
├── repositories/    # Data access layer (MongoDB operations)
├── routes/          # Express route definitions
├── services/        # Business logic layer (Auth, Customer, Email, ProductCategory, Product, Blog)
├── types/           # Common TypeScript interfaces, HTTP status codes, error codes
└── index.ts         # Application entry point & middleware wiring
```

### Architecture Layers

1. **Controllers** - Handle HTTP requests, input validation, and response envelopes
2. **Services** - Business logic, email notifications, authentication, and workflow orchestration
3. **Repositories** - Direct data access (MongoDB operations via generic `BaseRepository<T>`)
4. **Models** - Zod schemas for runtime validation and static TypeScript type inference
5. **DI Container** - Dependency injection container for loose coupling and testability

## Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local instance, Docker container, or MongoDB Atlas)

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

# Email Notification Settings
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=Infinite 7 Impex <noreply@infinite7impex.com>
ADMIN_EMAIL=admin@infinite7impex.com

# Admin Authentication Settings
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h
ADMIN_PASSWORD=Admin@12345

# Global Rate Limiting Settings
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
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

### Authentication
- `POST /api/auth/login` (or `/auth/login`) - Admin login (returns time-limited JWT token)
- `POST /api/auth/logout` (or `/auth/logout`) - Admin logout

#### Admin Login Request Body
```json
{
  "email": "admin@infinite7impex.com",
  "password": "Admin@12345"
}
```

### Customers

#### 1. Public Enquiry Submission
- `POST /api/customers` (or `/customers`) - Public customer enquiry submission
  - Creates customer record with `priority: 'unset'`, `isActive: true`, and `notes: ''`
  - Sends email notification to administrator via Nodemailer

**Request Body:**
```json
{
  "fullName": "John Doe",
  "country": "Sri Lanka",
  "email": "johndoe@gmail.com",
  "phone": "+94771234567",
  "message": "This is an enquiry message"
}
```

#### 2. Admin Customer Management (Requires `Authorization: Bearer <token>`)
- `GET /api/customers` - Get all customers with pagination, sorting, and filters:
  - `page`: Page number (default: `1`)
  - `limit`: Items per page (default: `10`)
  - `sortBy`: Field to sort by (default: `createdAt`)
  - `sortOrder`: `'asc'` or `'desc'` (default: `'desc'`)
  - `fullName`: Filter by customer name (case-insensitive substring)
  - `email`: Filter by email (case-insensitive substring)
  - `country`: Filter by country (case-insensitive substring)
  - `priority`: Filter by priority (`'high'`, `'low'`, `'medium'`, `'unset'`)
  - `notes`: Filter by admin notes (case-insensitive substring)
  - `isActive`: Filter by active status (`true` / `false`)
- `GET /api/customers/:id` - Get customer by MongoDB ObjectId
- `PATCH /api/customers/:id/priority` - Update customer priority (`high`, `low`, `medium`, `unset`)
- `DELETE /api/customers/:id` - Delete customer by MongoDB ObjectId

### Product Categories

#### 1. User-Side / Public Category Endpoints
- `GET /api/categories` (or `/categories`) - List all active categories:
  - `page`: Page number (default: `1`)
  - `limit`: Items per page (default: `10`)
  - `sortBy`: Field to sort by (default: `createdAt`)
  - `sortOrder`: `'asc'` or `'desc'` (default: `'desc'`)
  - `name`: Filter by category name (case-insensitive substring)
- `GET /api/categories/:id` (or `/categories/:id`) - Get single category by ID

#### 2. Admin Category Management (Requires `Authorization: Bearer <token>`)
- `POST /api/categories` (or `/categories`) - Create category (name: 2-50 chars, optional description, optional valid image URL)
- `PUT /api/categories/:id` (or `/categories/:id`) - Update category fields (name, description, image)
- `DELETE /api/categories/:id` (or `/categories/:id`) - Remove category by ID

### Products

#### 1. User-Side / Public Product Endpoints
- `GET /api/products` (or `/products`) - List all active products with populated category (`category: { _id, name }`):
  - `page`: Page number (default: `1`)
  - `limit`: Items per page (default: `10`)
  - `sortBy`: Field to sort by (default: `createdAt`)
  - `sortOrder`: `'asc'` or `'desc'` (default: `'desc'`)
  - `category`: Filter by category ObjectId
  - `name`: Filter by product name (case-insensitive substring)
  - `paginated`: If `'true'`, returns full pagination metadata object
- `GET /api/products/:id` (or `/products/:id`) - Get single active product by ID with populated category (`category: { _id, name }`)

#### 2. Admin Product Management (Requires `Authorization: Bearer <token>`)
- `POST /api/products` (or `/products`) - Create product (name: min 1 char, images: min 1 URL, category: valid category ObjectId, optional description)
  - Validates that the referenced category exists and is not removed; returns 400 `INVALID_REFERENCE` if category is not found
- `PUT /api/products/:id` (or `/products/:id`) - Update product fields (name, description, images, category)
  - Validates referenced category existence if `category` field is provided in the update
- `DELETE /api/products/:id` (or `/products/:id`) - Remove product by ID from database (returns `{ _id, isRemoved: true }`)

### Blogs

#### 1. User-Side / Public Blog Endpoints (SEO Friendly)
- `GET /api/blogs` (or `/blogs`) - List blog posts (sections omitted for lightweight payload):
  - `page`: Page number (default: `1`)
  - `limit`: Items per page (default: `10`)
  - `sortBy`: Field to sort by (default: `createdAt`)
  - `sortOrder`: `'asc'` or `'desc'` (default: `'desc'`)
  - `title`: Filter by blog title (case-insensitive substring)
  - `paginated`: If `'true'`, returns full pagination metadata object
- `GET /api/blogs/:id` (or `/blogs/:id`) - Get single blog post with full embedded sections

#### 2. Admin Blog Management (Requires `Authorization: Bearer <token>`)
- `POST /api/blogs` (or `/blogs`) - Create blog post (title: min 1, max 150 chars; description: required; optional image; sections: array with min 1 section)
- `PUT /api/blogs/:id` (or `/blogs/:id`) - Update blog post fields (any subset of title, description, image, sections)
- `DELETE /api/blogs/:id` (or `/blogs/:id`) - Delete blog post by ID from database (returns `data: null`)

## Response Envelope Format

All responses follow a consistent standard:

### Success Response
```json
{
  "success": true,
  "message": "Human-readable message",
  "data": {},
  "error": null
}
```

### Failure Response
```json
{
  "success": false,
  "message": "Field is not valid | Multiple fields are not valid | Error description",
  "data": null,
  "error": {
    "codeMsg": "ERROR_CODE",
    "details": [
      { "field": "email", "message": "Email must be a valid email address" }
    ]
  }
}
```

## Security & Features
- ✅ **JWT Authentication**: Time-limited signed token without stateful session overhead
- ✅ **Bcrypt Password Hashing**: Passwords stored safely hashed in MongoDB
- ✅ **Global Rate Limiting**: Protection against brute-force and DDoS attempts
- ✅ **Strict TypeScript**: Type-safe architecture with `strict` and `exactOptionalPropertyTypes`
- ✅ **Email Integration**: Automated admin notifications with fallback console logging