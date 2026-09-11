"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const admin_model_1 = require("../models/admin.model");
const response_helpers_1 = require("../utils/response-helpers");
const http_status_1 = require("../types/http-status");
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, res, next) {
        try {
            const validatedData = admin_model_1.AdminLoginSchema.parse(req.body);
            const result = await this.authService.login(validatedData);
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(result, 'Admin logged in successfully'));
        }
        catch (error) {
            next(error);
        }
    }
    async logout(_req, res, next) {
        try {
            await this.authService.logout();
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(null, 'Admin logged out successfully'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map