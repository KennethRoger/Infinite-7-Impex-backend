import { AppError } from '../middleware/error-handler';
import type { ErrorDetail } from './response';
export declare class ValidationError extends AppError {
    constructor(details: ErrorDetail[], message?: string);
}
//# sourceMappingURL=validation-error.d.ts.map