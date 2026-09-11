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
    async getAllCustomers(req, res, next) {
        try {
            const page = Math.max(1, parseInt(req.query['page'], 10) || 1);
            const limit = Math.max(1, Math.min(100, parseInt(req.query['limit'], 10) || 10));
            const sortBy = req.query['sortBy'] || 'createdAt';
            const sortOrder = req.query['sortOrder'] === 'asc' ? 'asc' : 'desc';
            const pagination = { page, limit };
            const sort = { field: sortBy, order: sortOrder };
            const filters = {};
            if (typeof req.query['fullName'] === 'string' && req.query['fullName'].trim() !== '') {
                filters.fullName = req.query['fullName'].trim();
            }
            if (typeof req.query['email'] === 'string' && req.query['email'].trim() !== '') {
                filters.email = req.query['email'].trim();
            }
            if (typeof req.query['country'] === 'string' && req.query['country'].trim() !== '') {
                filters.country = req.query['country'].trim();
            }
            if (typeof req.query['priority'] === 'string' && req.query['priority'].trim() !== '') {
                filters.priority = req.query['priority'].trim();
            }
            if (typeof req.query['notes'] === 'string' && req.query['notes'].trim() !== '') {
                filters.notes = req.query['notes'].trim();
            }
            if (req.query['isActive'] !== undefined) {
                filters.isActive = req.query['isActive'] === 'true';
            }
            const result = await this.customerService.getAllCustomers(filters, pagination, sort);
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(result, 'Customers retrieved successfully'));
        }
        catch (error) {
            next(error);
        }
    }
    async getCustomerById(req, res, next) {
        try {
            const id = req.params['id'];
            const customer = await this.customerService.getCustomerById(id);
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(customer, 'Customer retrieved successfully'));
        }
        catch (error) {
            next(error);
        }
    }
    async updatePriority(req, res, next) {
        try {
            const id = req.params['id'];
            const { priority } = customer_model_1.UpdateCustomerPrioritySchema.parse(req.body);
            const updatedCustomer = await this.customerService.updateCustomerPriority(id, priority);
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(updatedCustomer, 'Customer priority updated successfully'));
        }
        catch (error) {
            next(error);
        }
    }
    async deleteCustomer(req, res, next) {
        try {
            const id = req.params['id'];
            await this.customerService.deleteCustomer(id);
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)(null, 'Customer deleted successfully'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map