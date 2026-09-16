"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRoutes = createAuthRoutes;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
function createAuthRoutes(authController) {
    const router = (0, express_1.Router)();
    router.post('/login', (req, res, next) => authController.login(req, res, next));
    router.post('/logout', (req, res, next) => authController.logout(req, res, next));
    router.get('/me', auth_middleware_1.authenticateAdmin, (req, res, next) => authController.getMe(req, res, next));
    return router;
}
//# sourceMappingURL=auth.routes.js.map