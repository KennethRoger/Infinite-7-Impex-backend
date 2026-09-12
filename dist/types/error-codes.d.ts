export declare const ERROR_CODES: {
    readonly VALIDATION_ERROR: 'VALIDATION_ERROR';
    readonly NOT_FOUND: 'NOT_FOUND';
    readonly DUPLICATE_ENTRY: 'DUPLICATE_ENTRY';
    readonly SERVER_ERROR: 'SERVER_ERROR';
    readonly UNAUTHORIZED: 'UNAUTHORIZED';
    readonly FORBIDDEN: 'FORBIDDEN';
    readonly BAD_REQUEST: 'BAD_REQUEST';
    readonly CONFLICT: 'CONFLICT';
    readonly TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS';
    readonly INVALID_REFERENCE: 'INVALID_REFERENCE';
};
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
//# sourceMappingURL=error-codes.d.ts.map