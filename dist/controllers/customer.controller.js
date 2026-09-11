"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const customer_model_1 = require("../models/customer.model");
const response_helpers_1 = require("../utils/response-helpers");
const http_status_1 = require("../types/http-status");
class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async createCustomer(req, res, next) {
        try {
            const validatedData = customer_model_1.CreateCustomerSchema.parse(req.body);
            const customer = await this.customerService.createCustomer(validatedData);
            res.status(http_status_1.HTTP_STATUS.CREATED).json((0, response_helpers_1.createSuccessResponse)(customer, `Customer ${customer.fullName} was added successfully`));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map