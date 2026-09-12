# Application Models

This document describes the data models implemented for the Infinite 7 Impex application based on the eraser.io schema and domain requirements.

## Models Overview

### Admin
Represents the system administrator credentials for API management.

**Schema:**
```typescript
{
  email: string (required, valid email)
  passwordHash: string (required, bcrypt hash)
  role: 'admin' (default: 'admin')
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

**Repository Methods:**
- `findByEmail(email)` - Find administrator by email address
- Standard CRUD operations from BaseRepository

**File:** [admin.model.ts](file:///home/kenneth/Work/Projects/Infinite%207%20Impex%20-%20code/server/src/models/admin.model.ts)

---

### Customer
Represents customer enquiries with priority levels, contact information, and administrative notes.

**Schema:**
```typescript
{
  fullName: string (required, 2-20 characters)
  email: string (required, valid email)
  country: string (required, 1-100 characters)
  phone: string (required, string)
  message: string (required)
  priority: 'high' | 'low' | 'medium' | 'unset' (default: 'unset')
  isActive: boolean (default: true)
  notes: string (default: '')
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

**Repository Methods:**
- `findFiltered(filters, pagination, sort)` - Filter customers by `fullName`, `email`, `country`, `priority`, `notes`, `isActive` with pagination and sorting
- `findByEmail(email)` - Find customer by email
- `findByPhone(phone)` - Find customer by phone
- `findByCountry(country)` - Get customers by country
- `findByPriority(priority)` - Get customers by priority level
- `findActive()` - Get all active customers
- `findActiveByCountry(country)` - Get active customers by country
- `findActiveByPriority(priority)` - Get active customers by priority
- Standard CRUD operations from BaseRepository

**File:** [customer.model.ts](file:///home/kenneth/Work/Projects/Infinite%207%20Impex%20-%20code/server/src/models/customer.model.ts)

---

### ProductCategory
Represents product categories with hierarchical organization.

**Schema:**
```typescript
{
  name: string (required, 2-50 characters)
  description: string (optional)
  image: string (optional, valid URL)
  isRemoved: boolean (default: false)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

**Repository Methods:**
- `findActive()` - Get all non-removed categories
- `findByName(name)` - Find category by name (case-insensitive)
- `findFiltered(filters, pagination, sort)` - Find active categories filtered by name with pagination and sorting
- Standard CRUD operations from BaseRepository

**File:** [product-category.model.ts](file:///home/kenneth/Work/Projects/Infinite%207%20Impex%20-%20code/server/src/models/product-category.model.ts)

---

### Product
Represents products with category references, image galleries, and populated category projections.

**Schema:**
```typescript
{
  name: string (required, min 1 character)
  description: string (optional)
  images: string[] (required array of valid URLs, min 1 item)
  category: string (required, 24-hex ObjectId reference to ProductCategory)
  isRemoved: boolean (default: false)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

**Populated Product (Projection):**
```typescript
{
  _id: string
  name: string
  description?: string
  images: string[]
  category: {
    _id: string
    name: string
  }
  isRemoved: boolean
  createdAt: Date
  updatedAt: Date
}
```

**Repository Methods:**
- `findFiltered(filters, pagination, sort)` - Filter active products by `category` and `name` with pagination and sorting
- `findByCategory(categoryId)` - Get products by category
- `findActive()` - Get all non-removed products
- `findActiveByCategory(categoryId)` - Get active products by category
- Standard CRUD operations from BaseRepository

**File:** [product.model.ts](file:///home/kenneth/Work/Projects/Infinite%207%20Impex%20-%20code/server/src/models/product.model.ts)

---

### Blog
Represents blog posts with embedded sections for structured content.

**Schema:**
```typescript
{
  title: string (required, 1-200 characters)
  description: string (required)
  image: string (optional, URL)
  sections: BlogSection[] (array of embedded documents, default: [])
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

**BlogSection (Embedded Document):**
```typescript
{
  sectionTitle: string (optional)
  description: string (required)
}
```

**Repository Methods:**
- `findByTitle(title)` - Find blog by exact title
- `searchByTitle(searchTerm)` - Search blogs by title (case-insensitive)
- `addSection(blogId, section)` - Add a section to a blog
- `removeSection(blogId, sectionIndex)` - Remove a section from a blog
- Standard CRUD operations from BaseRepository

**File:** [blog.model.ts](file:///home/kenneth/Work/Projects/Infinite%207%20Impex%20-%20code/server/src/models/blog.model.ts)

---

## Repository Architecture

All repositories extend from `BaseRepository<T>` which provides standard CRUD operations:

- `findById(id)` - Find document by ObjectId
- `findOne(filter)` - Find single document by filter
- `findMany(filter, pagination, sort)` - Find multiple documents with pagination
- `create(data)` - Create new document
- `update(id, data)` - Update document by id
- `delete(id)` - Delete document by id
- `count(filter)` - Count documents matching filter

**Base Repository:** [base.repository.ts](file:///home/kenneth/Work/Projects/Infinite%207%20Impex%20-%20code/server/src/repositories/base.repository.ts)

## Dependency Injection

All repositories, services, and controllers are registered in the DI container in [src/di/index.ts](file:///home/kenneth/Work/Projects/Infinite%207%20Impex%20-%20code/server/src/di/index.ts):

- Repositories: `adminRepository`, `customerRepository`, `productCategoryRepository`, `productRepository`, `blogRepository`
- Services: `authService`, `customerService`, `emailService`, `productCategoryService`, `productService`
- Controllers: `authController`, `customerController`, `productCategoryController`, `productController`

## Database Collections

The repositories map to the following MongoDB collections:

- `admins` - Admin user credentials
- `customers` - Customer enquiry records and status
- `productCategories` - ProductCategory documents
- `products` - Product documents
- `blogs` - Blog documents with embedded sections