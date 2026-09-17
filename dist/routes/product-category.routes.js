"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductCategoryRoutes = createProductCategoryRoutes;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const cache_control_1 = require("../middleware/cache-control");
function createProductCategoryRoutes(productCategoryController) {
    const router = (0, express_1.Router)();
    // User side / Public routes
    router.get('/', (0, cache_control_1.publicCache)(120), (req, res, next) => productCategoryController.getAllCategories(req, res, next));
    router.get('/:id', (0, cache_control_1.publicCache)(120), (req, res, next) => productCategoryController.getCategoryById(req, res, next));
    // Admin routes (Protected by JWT authentication)
    router.post('/', auth_middleware_1.authenticateAdmin, (req, res, next) => productCategoryController.createCategory(req, res, next));
    router.put('/:id', auth_middleware_1.authenticateAdmin, (req, res, next) => productCategoryController.updateCategory(req, res, next));
    router.delete('/:id', auth_middleware_1.authenticateAdmin, (req, res, next) => productCategoryController.deleteCategory(req, res, next));
    return router;
}
//# sourceMappingURL=product-category.routes.js.map