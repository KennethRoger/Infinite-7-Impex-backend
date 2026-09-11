"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const error_handler_1 = require("../middleware/error-handler");
const error_codes_1 = require("./error-codes");
class ValidationError extends error_handler_1.AppError {
    constructor(details, message = 'Validation failed') {
        super(400, error_codes_1.ERROR_CODES.VALIDATION_ERROR, message, details);
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=validation-error.js.map