"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerRoutes = createCustomerRoutes;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
function createCustomerRoutes(customerController) {
    const router = (0, express_1.Router)();
    // Public enquiry route
    router.post('/', (req, res, next) => customerController.createCustomer(req, res, next));
    // Admin routes (protected by JWT authentication)
    router.get('/', auth_middleware_1.authenticateAdmin, (req, res, next) => customerController.getAllCustomers(req, res, next));
    router.get('/:id', auth_middleware_1.authenticateAdmin, (req, res, next) => customerController.getCustomerById(req, res, next));
    router.patch('/:id/priority', auth_middleware_1.authenticateAdmin, (req, res, next) => customerController.updatePriority(req, res, next));
    router.delete('/:id', auth_middleware_1.authenticateAdmin, (req, res, next) => customerController.deleteCustomer(req, res, next));
    return router;
}
//# sourceMappingURL=customer.routes.js.map