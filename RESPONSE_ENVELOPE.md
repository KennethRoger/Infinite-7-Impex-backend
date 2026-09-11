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

The following error codes are defined in [src/types/error-codes.ts](file:///home/kenneth/Work/Projects/Infinite%207%20Impex%20-%20code/server/src/types/error-codes.ts):

- `VALIDATION_ERROR` - Input validation failed
- `NOT_FOUND` - Resource not found
- `DUPLICATE_ENTRY` - Duplicate entry conflict
- `SERVER_ERROR` - Internal server error
- `UNAUTHORIZED` - Authentication required or invalid/expired token
- `FORBIDDEN` - Access denied
- `BAD_REQUEST` - Invalid request
- `CONFLICT` - Resource conflict
- `TOO_MANY_REQUESTS` - Global rate limit exceeded (HTTP 429)

## Response Helper Functions

Located in [src/utils/response-helpers.ts](file:///home/kenneth/Work/Projects/Infinite%207%20Impex%20-%20code/server/src/utils/response-helpers.ts):

### Success Responses
- `createSuccessResponse(data, message)` - Create a success response

### Error Responses
- `createFailureResponse(message, codeMsg, details)` - Generic failure response
- `createValidationErrorResponse(details, message)` - Validation error (dynamically formats "Field is not valid" vs "Multiple fields are not valid")
- `createNotFoundResponse(message)` - Resource not found (404)
- `createDuplicateEntryResponse(message)` - Duplicate entry error (409)
- `createUnauthorizedResponse(message)` - Authentication required / invalid token (401)
- `createForbiddenResponse(message)` - Access denied (403)
- `createBadRequestResponse(message)` - Bad request (400)
- `createConflictResponse(message)` - Resource conflict (409)
- `createTooManyRequestsResponse(message)` - Rate limit exceeded (429)

## Error Handling Middleware

The error handling middleware in [src/middleware/error-handler.ts](file:///home/kenneth/Work/Projects/Infinite%207%20Impex%20-%20code/server/src/middleware/error-handler.ts) automatically:

1. Handles Zod validation errors and converts them to proper error responses with field-level details
2. Handles custom application errors (`AppError` class)
3. Handles standard JavaScript/database errors with intelligent error code mapping
4. Ensures consistent error response format across all endpoints

### Custom Application Errors

You can create custom application errors by instantiating `AppError`:

```typescript
import { AppError } from '../middleware/error-handler';
import { ERROR_CODES } from '../types/error-codes';
import { HTTP_STATUS } from '../types/http-status';

throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, 'Customer not found');
```

## Error Details Format

The `details` array in error responses always contains objects with:

```typescript
{
  field: string,    // The field that caused the error
  message: string   // Human-readable error message for that field
}
```

For non-validation errors (like "not found" or "rate limit exceeded"), the details array is empty `[]` since there is no per-field breakdown.