"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductRoutes = createProductRoutes;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
function createProductRoutes(productController) {
    const router = (0, express_1.Router)();
    // User side / Public routes
    router.get('/', (req, res, next) => productController.getAllProducts(req, res, next));
    router.get('/:id', (req, res, next) => productController.getProductById(req, res, next));
    // Admin routes (Protected by JWT authentication)
    router.post('/', auth_middleware_1.authenticateAdmin, (req, res, next) => productController.createProduct(req, res, next));
    router.put('/:id', auth_middleware_1.authenticateAdmin, (req, res, next) => productController.updateProduct(req, res, next));
    router.delete('/:id', auth_middleware_1.authenticateAdmin, (req, res, next) => productController.deleteProduct(req, res, next));
    return router;
}
//# sourceMappingURL=product.routes.js.map