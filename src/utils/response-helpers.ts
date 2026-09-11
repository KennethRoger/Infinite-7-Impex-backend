import { SuccessResponse, FailureResponse, ErrorDetail } from '../types/response';
import { ERROR_CODES, ErrorCode } from '../types/error-codes';

export function createSuccessResponse<T>(
  data: T,
  message: string = 'Success'
): SuccessResponse<T> {
  return {
    success: true,
    message,
    data,
    error: null,
  };
}

export function createFailureResponse(
  message: string,
  codeMsg: ErrorCode = ERROR_CODES.SERVER_ERROR,
  details: ErrorDetail[] = []
): FailureResponse {
  return {
    success: false,
    message,
    data: null,
    error: {
      codeMsg,
      details,
    },
  };
}

export function createValidationErrorResponse(
  details: ErrorDetail[],
  message: string = 'Validation failed'
): FailureResponse {
  return createFailureResponse(message, ERROR_CODES.VALIDATION_ERROR, details);
}

export function createNotFoundResponse(
  message: string = 'Resource not found'
): FailureResponse {
  return createFailureResponse(message, ERROR_CODES.NOT_FOUND, []);
}

export function createDuplicateEntryResponse(
  message: string = 'Duplicate entry'
): FailureResponse {
  return createFailureResponse(message, ERROR_CODES.DUPLICATE_ENTRY, []);
}

export function createUnauthorizedResponse(
  message: string = 'Unauthorized'
): FailureResponse {
  return createFailureResponse(message, ERROR_CODES.UNAUTHORIZED, []);
}

export function createForbiddenResponse(
  message: string = 'Forbidden'
): FailureResponse {
  return createFailureResponse(message, ERROR_CODES.FORBIDDEN, []);
}

export function createBadRequestResponse(
  message: string = 'Bad request'
): FailureResponse {
  return createFailureResponse(message, ERROR_CODES.BAD_REQUEST, []);
}

export function createConflictResponse(
  message: string = 'Conflict'
): FailureResponse {
  return createFailureResponse(message, ERROR_CODES.CONFLICT, []);
}