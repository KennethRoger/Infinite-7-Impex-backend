"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const base_repository_1 = require("./base.repository");
class CustomerRepository extends base_repository_1.BaseRepository {
    constructor(db) {
        super(db, 'customers');
    }
    async findByEmail(email) {
        return this.findOne({ email });
    }
    async findByPhone(phone) {
        return this.findOne({ phone });
    }
    async findByCountry(country) {
        const result = await this.findMany({ country });
        return result.data;
    }
    async findByPriority(priority) {
        const result = await this.findMany({ priority });
        return result.data;
    }
    async findActive() {
        const result = await this.findMany({ isActive: true });
        return result.data;
    }
    async findActiveByCountry(country) {
        const result = await this.findMany({ country, isActive: true });
        return result.data;
    }
    async findActiveByPriority(priority) {
        const result = await this.findMany({ priority, isActive: true });
        return result.data;
    }
}
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=customer.repository.js.map