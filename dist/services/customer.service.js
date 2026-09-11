"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
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
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map