import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ErrorCode } from '../types/error-codes';
import { HttpStatusCode } from '../types/http-status';
import type { ErrorDetail } from '../types/response';
export declare class AppError extends Error {
    statusCode: HttpStatusCode;
    codeMsg: ErrorCode;
    details: ErrorDetail[];
    constructor(statusCode: HttpStatusCode, codeMsg: ErrorCode, message: string, details?: ErrorDetail[]);
}
export declare function errorHandler(err: Error | AppError | ZodError, _req: Request, res: Response, _next: NextFunction): void;
//# sourceMappingURL=error-handler.d.ts.map