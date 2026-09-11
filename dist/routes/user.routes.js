"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRoutes = createUserRoutes;
const express_1 = require("express");
function createUserRoutes(userController) {
    const router = (0, express_1.Router)();
    router.get('/', (req, res, next) => userController.getAllUsers(req, res, next));
    router.get('/:id', (req, res, next) => userController.getUserById(req, res, next));
    router.post('/', (req, res, next) => userController.createUser(req, res, next));
    router.put('/:id', (req, res, next) => userController.updateUser(req, res, next));
    router.delete('/:id', (req, res, next) => userController.deleteUser(req, res, next));
    return router;
}
//# sourceMappingURL=user.routes.js.map