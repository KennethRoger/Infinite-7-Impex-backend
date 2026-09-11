import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { 
  createFailureResponse, 
  createValidationErrorResponse,
  createNotFoundResponse,
  createDuplicateEntryResponse
} from '../utils/response-helpers';
import { ERROR_CODES, ErrorCode } from '../types/error-codes';
import type { ErrorDetail } from '../types/response';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public codeMsg: ErrorCode,
    message: string,
    public details: ErrorDetail[] = []
  ) {
    super(message);
    this.name = 'AppError';
  }
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
    const details = err.issues.map((error: any) => ({
      field: error.path.join('.'),
      message: error.message,
    }));
    
    res.status(400).json(createValidationErrorResponse(details));
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
    res.status(404).json(createNotFoundResponse(errorMessage));
    return;
  }
  
  if (errorMessage.includes('Validation error')) {
    res.status(400).json(createValidationErrorResponse([], errorMessage));
    return;
  }
  
  if (errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
    res.status(409).json(createDuplicateEntryResponse(errorMessage));
    return;
  }

  // Default server error
  res.status(500).json(createFailureResponse(errorMessage, ERROR_CODES.SERVER_ERROR));
}