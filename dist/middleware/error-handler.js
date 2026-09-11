"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const response_helpers_1 = require("../utils/response-helpers");
const error_codes_1 = require("../types/error-codes");
const http_status_1 = require("../types/http-status");
class AppError extends Error {
    constructor(statusCode, codeMsg, message, details = []) {
        super(message);
        this.statusCode = statusCode;
        this.codeMsg = codeMsg;
        this.details = details;
        this.name = 'AppError';
    }
}
exports.AppError = AppError;
function errorHandler(err, _req, res, _next) {
    console.error('Error:', err);
    // Handle Zod validation errors
    if (err instanceof zod_1.ZodError) {
        const details = err.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
        }));
        res.status(http_status_1.HTTP_STATUS.BAD_REQUEST).json((0, response_helpers_1.createValidationErrorResponse)(details));
        return;
    }
    // Handle custom application errors
    if (err instanceof AppError) {
        res.status(err.statusCode).json((0, response_helpers_1.createFailureResponse)(err.message, err.codeMsg, err.details));
        return;
    }
    // Handle standard errors
    const errorMessage = err.message || 'Internal server error';
    if (errorMessage.includes('not found')) {
        res.status(http_status_1.HTTP_STATUS.NOT_FOUND).json((0, response_helpers_1.createNotFoundResponse)(errorMessage));
        return;
    }
    if (errorMessage.includes('Validation error')) {
        res.status(http_status_1.HTTP_STATUS.BAD_REQUEST).json((0, response_helpers_1.createValidationErrorResponse)([], errorMessage));
        return;
    }
    if (errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
        res.status(http_status_1.HTTP_STATUS.CONFLICT).json((0, response_helpers_1.createDuplicateEntryResponse)(errorMessage));
        return;
    }
    // Default server error
    res.status(http_status_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json((0, response_helpers_1.createFailureResponse)(errorMessage, error_codes_1.ERROR_CODES.SERVER_ERROR));
}
//# sourceMappingURL=error-handler.js.map