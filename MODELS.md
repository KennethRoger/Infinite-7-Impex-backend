# Application Models

This document describes the data models implemented for the Infinite 7 Impex application based on the eraser.io schema.

## Models Overview

### ProductCategory
Represents product categories with hierarchical organization.

**Schema:**
```typescript
{
  name: string (required, 1-100 characters)
  description: string (optional)
  image: string (optional, URL)
  isRemoved: boolean (default: false)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

**Repository Methods:**
- `findActive()` - Get all non-removed categories
- `findByName(name)` - Find category by name
- Standard CRUD operations from BaseRepository

**File:** <ref_file file="/home/kenneth/Work/Projects/Infinite 7 Impex - code/server/src/models/product-category.model.ts" />

---

### Product
Represents products with category references and image galleries.

**Schema:**
```typescript
{
  name: string (required, 1-200 characters)
  description: string (optional)
  images: string[] (array of URLs, default: [])
  category: string (required, ObjectId reference to ProductCategory)
  isRemoved: boolean (default: false)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

**Repository Methods:**
- `findByCategory(categoryId)` - Get products by category
- `findActive()` - Get all non-removed products
- `findActiveByCategory(categoryId)` - Get active products by category
- Standard CRUD operations from BaseRepository

**File:** <ref_file file="/home/kenneth/Work/Projects/Infinite 7 Impex - code/server/src/models/product.model.ts" />

---

### Customer
Represents customer information with priority levels and status tracking.

**Schema:**
```typescript
{
  fullName: string (required, 1-100 characters)
  email: string (required, valid email)
  country: string (required, 1-100 characters)
  phone: string (required, 1-20 characters)
  priority: 'high' | 'low' | 'medium' | 'unset' (default: 'unset')
  isActive: boolean (default: true)
  notes: string (optional)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

**Repository Methods:**
- `findByEmail(email)` - Find customer by email
- `findByPhone(phone)` - Find customer by phone
- `findByCountry(country)` - Get customers by country
- `findByPriority(priority)` - Get customers by priority level
- `findActive()` - Get all active customers
- `findActiveByCountry(country)` - Get active customers by country
- `findActiveByPriority(priority)` - Get active customers by priority
- Standard CRUD operations from BaseRepository

**File:** <ref_file file="/home/kenneth/Work/Projects/Infinite 7 Impex - code/server/src/models/customer.model.ts" />

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

**File:** <ref_file file="/home/kenneth/Work/Projects/Infinite 7 Impex - code/server/src/models/blog.model.ts" />

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

**Base Repository:** <ref_file file="/home/kenneth/Work/Projects/Infinite 7 Impex - code/server/src/repositories/base.repository.ts" />

## Dependency Injection

All repositories are registered in the DI container in <ref_file file="/home/kenneth/Work/Projects/Infinite 7 Impex - code/server/src/di/index.ts" />:

- `productCategoryRepository`
- `productRepository`
- `customerRepository`
- `blogRepository`

## Validation

All models use Zod schemas for runtime validation:

- Create schemas for input validation
- Update schemas for partial updates
- TypeScript types inferred from Zod schemas
- Validation errors return detailed messages

## Database Collections

The repositories map to the following MongoDB collections:

- `productCategories` - ProductCategory documents
- `products` - Product documents
- `customers` - Customer documents
- `blogs` - Blog documents with embedded sections

## Next Steps

To implement full CRUD operations for these models:

1. Create service classes for each model (business logic layer)
2. Create controller classes for HTTP request handling
3. Create route definitions for Express
4. Register routes in the main application
5. Add API endpoints for each model