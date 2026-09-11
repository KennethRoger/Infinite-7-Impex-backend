"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const base_repository_1 = require("./base.repository");
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
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
    async findFiltered(filters = {}, pagination, sort) {
        const mongoFilter = {};
        if (filters.fullName && filters.fullName.trim() !== '') {
            mongoFilter['fullName'] = { $regex: escapeRegex(filters.fullName.trim()), $options: 'i' };
        }
        if (filters.email && filters.email.trim() !== '') {
            mongoFilter['email'] = { $regex: escapeRegex(filters.email.trim()), $options: 'i' };
        }
        if (filters.country && filters.country.trim() !== '') {
            mongoFilter['country'] = { $regex: escapeRegex(filters.country.trim()), $options: 'i' };
        }
        if (filters.priority) {
            mongoFilter['priority'] = filters.priority;
        }
        if (filters.notes && filters.notes.trim() !== '') {
            mongoFilter['notes'] = { $regex: escapeRegex(filters.notes.trim()), $options: 'i' };
        }
        if (typeof filters.isActive === 'boolean') {
            mongoFilter['isActive'] = filters.isActive;
        }
        return this.findMany(mongoFilter, pagination, sort);
    }
}
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=customer.repository.js.map