import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { 
  createFailureResponse, 
  createValidationErrorResponse,
  createNotFoundResponse,
  createDuplicateEntryResponse
} from '../utils/response-helpers';
import { ERROR_CODES, ErrorCode } from '../types/error-codes';
import { HTTP_STATUS, HttpStatusCode } from '../types/http-status';
import type { ErrorDetail } from '../types/response';

export class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public codeMsg: ErrorCode,
    message: string,
    public details: ErrorDetail[] = []
  ) {
    super(message);
    this.name = 'AppError';
  }
}

function formatZodPath(path: (string | number | symbol)[]): string {
  return path.reduce<string>((acc, segment, idx) => {
    const isIndex =
      typeof segment === 'number' || (typeof segment === 'string' && /^\d+$/.test(segment));
    if (idx === 0) {
      return segment.toString();
    }
    if (isIndex) {
      return `${acc}[${segment}]`;
    }
    return `${acc}.${segment.toString()}`;
  }, '');
}

export function errorHandler(
  err: Error | AppError | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error:', err);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const details: ErrorDetail[] = err.issues.map((issue) => ({
      field: formatZodPath(issue.path),
      message: issue.message,
    }));
    
    res.status(HTTP_STATUS.BAD_REQUEST).json(createValidationErrorResponse(details));
    return;
  }

  // Handle custom application errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json(
      createFailureResponse(err.message, err.codeMsg, err.details)
    );
    return;
  }

  // Handle standard errors
  const errorMessage = err.message || 'Internal server error';
  
  if (errorMessage.includes('not found')) {
    res.status(HTTP_STATUS.NOT_FOUND).json(createNotFoundResponse(errorMessage));
    return;
  }
  
  if (errorMessage.includes('Validation error')) {
    res.status(HTTP_STATUS.BAD_REQUEST).json(createValidationErrorResponse([], errorMessage));
    return;
  }
  
  if (errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
    res.status(HTTP_STATUS.CONFLICT).json(createDuplicateEntryResponse(errorMessage));
    return;
  }

  // Default server error
  const isProduction = process.env['NODE_ENV'] === 'production';
  const safeMessage = isProduction ? 'An unexpected error occurred. Please try again later.' : errorMessage;
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(createFailureResponse(safeMessage, ERROR_CODES.SERVER_ERROR));
}