import { SuccessResponse, FailureResponse, ErrorDetail } from '../types/response';
import { ErrorCode } from '../types/error-codes';
export declare const VALIDATION_MESSAGES: {
    readonly SINGLE_FIELD_INVALID: 'Field is not valid';
    readonly MULTIPLE_FIELDS_INVALID: 'Multiple fields are not valid';
    readonly DEFAULT_FAILED: 'Validation failed';
};
export declare function createSuccessResponse<T>(data: T, message?: string): SuccessResponse<T>;
export declare function createFailureResponse(message: string, codeMsg?: ErrorCode, details?: ErrorDetail[]): FailureResponse;
export declare function createValidationErrorResponse(details: ErrorDetail[], message?: string): FailureResponse;
export declare function createNotFoundResponse(message?: string): FailureResponse;
export declare function createDuplicateEntryResponse(message?: string): FailureResponse;
export declare function createUnauthorizedResponse(message?: string): FailureResponse;
export declare function createForbiddenResponse(message?: string): FailureResponse;
export declare function createBadRequestResponse(message?: string): FailureResponse;
export declare function createConflictResponse(message?: string): FailureResponse;
//# sourceMappingURL=response-helpers.d.ts.map