"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const mongodb_1 = require("mongodb");
const error_handler_1 = require("../middleware/error-handler");
const http_status_1 = require("../types/http-status");
const error_codes_1 = require("../types/error-codes");
class CustomerService {
    constructor(customerRepository, emailService) {
        this.customerRepository = customerRepository;
        this.emailService = emailService;
    }
    async createCustomer(dto) {
        const createdCustomer = await this.customerRepository.create(dto);
        // Trigger notification to admin email without blocking DB creation on mail errors
        try {
            await this.emailService.sendCustomerEnquiryNotification({
                fullName: createdCustomer.fullName,
                country: createdCustomer.country,
                email: createdCustomer.email,
                phone: createdCustomer.phone,
                message: createdCustomer.message,
                createdAt: createdCustomer.createdAt,
            });
        }
        catch (mailError) {
            console.error('[CustomerService] Email dispatch failed:', mailError);
        }
        return createdCustomer;
    }
    async getAllCustomers(filters = {}, pagination, sort) {
        return this.customerRepository.findFiltered(filters, pagination, sort);
    }
    async getCustomerById(id) {
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Customer not found');
        }
        const customer = await this.customerRepository.findById(id);
        if (!customer) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Customer not found');
        }
        return customer;
    }
    async updateCustomerPriority(id, priority) {
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Customer not found');
        }
        const existingCustomer = await this.customerRepository.findById(id);
        if (!existingCustomer) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Customer not found');
        }
        const updatedCustomer = await this.customerRepository.update(id, { priority });
        if (!updatedCustomer) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Customer not found');
        }
        return updatedCustomer;
    }
    async deleteCustomer(id) {
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Customer not found');
        }
        const existingCustomer = await this.customerRepository.findById(id);
        if (!existingCustomer) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.NOT_FOUND, error_codes_1.ERROR_CODES.NOT_FOUND, 'Customer not found');
        }
        const isDeleted = await this.customerRepository.delete(id);
        if (!isDeleted) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, error_codes_1.ERROR_CODES.SERVER_ERROR, 'Failed to delete customer');
        }
        return true;
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map