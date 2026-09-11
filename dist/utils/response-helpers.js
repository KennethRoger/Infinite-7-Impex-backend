"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION_MESSAGES = void 0;
exports.createSuccessResponse = createSuccessResponse;
exports.createFailureResponse = createFailureResponse;
exports.createValidationErrorResponse = createValidationErrorResponse;
exports.createNotFoundResponse = createNotFoundResponse;
exports.createDuplicateEntryResponse = createDuplicateEntryResponse;
exports.createUnauthorizedResponse = createUnauthorizedResponse;
exports.createForbiddenResponse = createForbiddenResponse;
exports.createBadRequestResponse = createBadRequestResponse;
exports.createConflictResponse = createConflictResponse;
exports.createTooManyRequestsResponse = createTooManyRequestsResponse;
const error_codes_1 = require("../types/error-codes");
exports.VALIDATION_MESSAGES = {
    SINGLE_FIELD_INVALID: 'Field is not valid',
    MULTIPLE_FIELDS_INVALID: 'Multiple fields are not valid',
    DEFAULT_FAILED: 'Validation failed',
};
function createSuccessResponse(data, message = 'Success') {
    return {
        success: true,
        message,
        data,
        error: null,
    };
}
function createFailureResponse(message, codeMsg = error_codes_1.ERROR_CODES.SERVER_ERROR, details = []) {
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
function createValidationErrorResponse(details, message) {
    const resolvedMessage = message ||
        (details.length === 1
            ? exports.VALIDATION_MESSAGES.SINGLE_FIELD_INVALID
            : details.length > 1
                ? exports.VALIDATION_MESSAGES.MULTIPLE_FIELDS_INVALID
                : exports.VALIDATION_MESSAGES.DEFAULT_FAILED);
    return createFailureResponse(resolvedMessage, error_codes_1.ERROR_CODES.VALIDATION_ERROR, details);
}
function createNotFoundResponse(message = 'Resource not found') {
    return createFailureResponse(message, error_codes_1.ERROR_CODES.NOT_FOUND, []);
}
function createDuplicateEntryResponse(message = 'Duplicate entry') {
    return createFailureResponse(message, error_codes_1.ERROR_CODES.DUPLICATE_ENTRY, []);
}
function createUnauthorizedResponse(message = 'Unauthorized') {
    return createFailureResponse(message, error_codes_1.ERROR_CODES.UNAUTHORIZED, []);
}
function createForbiddenResponse(message = 'Forbidden') {
    return createFailureResponse(message, error_codes_1.ERROR_CODES.FORBIDDEN, []);
}
function createBadRequestResponse(message = 'Bad request') {
    return createFailureResponse(message, error_codes_1.ERROR_CODES.BAD_REQUEST, []);
}
function createConflictResponse(message = 'Conflict') {
    return createFailureResponse(message, error_codes_1.ERROR_CODES.CONFLICT, []);
}
function createTooManyRequestsResponse(message = 'Too many requests, please try again later') {
    return createFailureResponse(message, error_codes_1.ERROR_CODES.TOO_MANY_REQUESTS, []);
}
//# sourceMappingURL=response-helpers.js.map