"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateEntryError = void 0;
const error_handler_1 = require("../middleware/error-handler");
const error_codes_1 = require("./error-codes");
class DuplicateEntryError extends error_handler_1.AppError {
    constructor(message = 'Duplicate entry') {
        super(409, error_codes_1.ERROR_CODES.DUPLICATE_ENTRY, message, []);
    }
}
exports.DuplicateEntryError = DuplicateEntryError;
//# sourceMappingURL=duplicate-error.js.map