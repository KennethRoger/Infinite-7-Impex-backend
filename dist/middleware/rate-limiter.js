"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("../config");
const response_helpers_1 = require("../utils/response-helpers");
const http_status_1 = require("../types/http-status");
exports.globalRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: config_1.config.rateLimit.windowMs,
    max: config_1.config.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        // Exempt authenticated requests (e.g. admin portal actions/searches)
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return true;
        }
        // Also skip OPTIONS preflight requests
        if (req.method === 'OPTIONS') {
            return true;
        }
        return false;
    },
    handler: (_req, res) => {
        res.status(http_status_1.HTTP_STATUS.TOO_MANY_REQUESTS).json((0, response_helpers_1.createTooManyRequestsResponse)('Too many requests, please try again later'));
    },
});
//# sourceMappingURL=rate-limiter.js.map