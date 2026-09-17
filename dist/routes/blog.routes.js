"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogRoutes = createBlogRoutes;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const cache_control_1 = require("../middleware/cache-control");
function createBlogRoutes(blogController) {
    const router = (0, express_1.Router)();
    // User side / Public routes (SEO friendly)
    router.get('/', (0, cache_control_1.publicCache)(15), (req, res, next) => blogController.getAllBlogs(req, res, next));
    router.get('/:id', (0, cache_control_1.publicCache)(15), (req, res, next) => blogController.getBlogById(req, res, next));
    // Admin routes (Protected by JWT authentication)
    router.post('/', auth_middleware_1.authenticateAdmin, (req, res, next) => blogController.createBlog(req, res, next));
    router.put('/:id', auth_middleware_1.authenticateAdmin, (req, res, next) => blogController.updateBlog(req, res, next));
    router.delete('/:id', auth_middleware_1.authenticateAdmin, (req, res, next) => blogController.deleteBlog(req, res, next));
    return router;
}
//# sourceMappingURL=blog.routes.js.map