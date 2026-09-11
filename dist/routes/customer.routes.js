"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerRoutes = createCustomerRoutes;
const express_1 = require("express");
function createCustomerRoutes(customerController) {
    const router = (0, express_1.Router)();
    router.post('/', (req, res, next) => customerController.createCustomer(req, res, next));
    return router;
}
//# sourceMappingURL=customer.routes.js.map