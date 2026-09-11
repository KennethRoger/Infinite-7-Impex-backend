"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const error_handler_1 = require("../middleware/error-handler");
const error_codes_1 = require("./error-codes");
class NotFoundError extends error_handler_1.AppError {
    constructor(message = 'Resource not found') {
        super(404, error_codes_1.ERROR_CODES.NOT_FOUND, message, []);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=not-found-error.js.map