# Response Envelope Documentation

This document describes the standardized response envelope implementation for the Infinite 7 Impex API.

## Response Structure

All API responses follow a consistent envelope format for both success and failure cases.

### Success Response

```json
{
  "success": true,
  "message": "Human-readable success message",
  "data": {},
  "error": null
}
```

### Failure Response

```json
{
  "success": false,
  "message": "Human-readable failure summary",
  "data": null,
  "error": {
    "codeMsg": "SHORT_ERROR_CODE",
    "details": [
      { "field": "fieldName", "message": "What's wrong with this field" }
    ]
  }
}
```

## Error Codes

The following error codes are defined in <ref_file file="/home/kenneth/Work/Projects/Infinite 7 Impex - code/server/src/types/error-codes.ts" />:

- `VALIDATION_ERROR` - Input validation failed
- `NOT_FOUND` - Resource not found
- `DUPLICATE_ENTRY` - Duplicate entry conflict
- `SERVER_ERROR` - Internal server error
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Access denied
- `BAD_REQUEST` - Invalid request
- `CONFLICT` - Resource conflict

## Response Helper Functions

Located in <ref_file file="/home/kenneth/Work/Projects/Infinite 7 Impex - code/server/src/utils/response-helpers.ts" />:

### Success Responses
- `createSuccessResponse(data, message)` - Create a success response

### Error Responses
- `createFailureResponse(message, codeMsg, details)` - Generic failure response
- `createValidationErrorResponse(details, message)` - Validation error with field details
- `createNotFoundResponse(message)` - Resource not found
- `createDuplicateEntryResponse(message)` - Duplicate entry error
- `createUnauthorizedResponse(message)` - Authentication required
- `createForbiddenResponse(message)` - Access denied
- `createBadRequestResponse(message)` - Bad request
- `createConflictResponse(message)` - Resource conflict

## Error Handling Middleware

The error handling middleware in <ref_file file="/home/kenneth/Work/Projects/Infinite 7 Impex - code/server/src/middleware/error-handler.ts" /> automatically:

1. Handles Zod validation errors and converts them to proper error responses
2. Handles custom application errors (AppError class)
3. Handles standard JavaScript errors with intelligent error code detection
4. Ensures consistent error response format across all endpoints

### Custom Application Errors

You can create custom application errors by extending the `AppError` class:

```typescript
import { AppError } from '../middleware/error-handler';
import { ERROR_CODES } from '../types/error-codes';

export class CustomError extends AppError {
  constructor(message: string) {
    super(400, ERROR_CODES.BAD_REQUEST, message, []);
  }
}
```

## Usage Examples

### In Controllers

```typescript
import { createSuccessResponse, createNotFoundResponse } from '../utils/response-helpers';

async getUserById(req, res, next) {
  try {
    const user = await this.userService.getUserById(req.params.id);
    res.json(createSuccessResponse(user, 'User retrieved successfully'));
  } catch (error) {
    next(error); // Let error handler middleware process it
  }
}
```

### In Services

```typescript
import { AppError } from '../middleware/error-handler';
import { ERROR_CODES } from '../types/error-codes';

async getUserById(id: string) {
  const user = await this.userRepository.findById(id);
  if (!user) {
    throw new AppError(404, ERROR_CODES.NOT_FOUND, 'User not found');
  }
  return user;
}
```

### Validation with Zod

```typescript
import { ZodError } from 'zod';

try {
  const validatedData = CreateUserSchema.parse(req.body);
  // Process validated data
} catch (error) {
  if (error instanceof ZodError) {
    // Zod errors are automatically handled by the middleware
    next(error);
  }
}
```

## Error Details Format

The `details` array in error responses always contains objects with:

```typescript
{
  field: string,    // The field that caused the error
  message: string   // Human-readable error message for that field
}
```

For non-validation errors (like "not found"), the details array is empty `[]` since there's no per-field breakdown.

## Testing the Response Envelope

The response envelope is automatically applied to all endpoints. Test endpoints:

```bash
# Success response
curl http://localhost:3000/

# Success response with data
curl http://localhost:3000/health

# 404 response
curl http://localhost:3000/nonexistent
```

## Best Practices

1. **Always use helper functions** - Use the provided response helper functions instead of manually constructing responses
2. **Throw errors in services** - Let services throw errors and let controllers pass them to the error handler
3. **Use specific error codes** - Choose the most appropriate error code for each error scenario
4. **Provide clear messages** - Use human-readable messages that help frontend developers understand the issue
5. **Validation details** - Always include field-level details for validation errors
6. **Consistent format** - Never bypass the response envelope - all responses must follow the standard format

## Integration with Existing Code

The response envelope is already integrated into:

- **Basic routes** - `/` and `/health` endpoints use success responses
- **Error handling** - Global error handler ensures all errors return proper envelope format
- **404 handler** - Unmatched routes return proper not-found response

When implementing new endpoints, use the response helper functions to maintain consistency.