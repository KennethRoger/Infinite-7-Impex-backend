"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = authenticateAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const error_handler_1 = require("./error-handler");
const http_status_1 = require("../types/http-status");
const error_codes_1 = require("../types/error-codes");
function authenticateAdmin(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.UNAUTHORIZED, error_codes_1.ERROR_CODES.UNAUTHORIZED, 'Authentication token required');
    }
    const token = authHeader.slice(7).trim();
    if (!token) {
        throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.UNAUTHORIZED, error_codes_1.ERROR_CODES.UNAUTHORIZED, 'Authentication token required');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
        req.user = decoded;
        next();
    }
    catch (_error) {
        throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.UNAUTHORIZED, error_codes_1.ERROR_CODES.UNAUTHORIZED, 'Invalid or expired authentication token');
    }
}
//# sourceMappingURL=auth.middleware.js.map