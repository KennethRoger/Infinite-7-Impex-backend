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
        const conditions = [];
        if (filters.search && filters.search.trim() !== '') {
            const searchRegex = { $regex: escapeRegex(filters.search.trim()), $options: 'i' };
            conditions.push({
                $or: [
                    { fullName: searchRegex },
                    { email: searchRegex },
                    { country: searchRegex },
                    { phone: searchRegex },
                    { notes: searchRegex },
                    { message: searchRegex },
                ],
            });
        }
        if (filters.fullName && filters.fullName.trim() !== '') {
            conditions.push({ fullName: { $regex: escapeRegex(filters.fullName.trim()), $options: 'i' } });
        }
        if (filters.email && filters.email.trim() !== '') {
            conditions.push({ email: { $regex: escapeRegex(filters.email.trim()), $options: 'i' } });
        }
        if (filters.country && filters.country.trim() !== '') {
            conditions.push({ country: { $regex: escapeRegex(filters.country.trim()), $options: 'i' } });
        }
        if (filters.priority) {
            conditions.push({ priority: filters.priority });
        }
        if (filters.notes && filters.notes.trim() !== '') {
            conditions.push({ notes: { $regex: escapeRegex(filters.notes.trim()), $options: 'i' } });
        }
        if (typeof filters.isActive === 'boolean') {
            conditions.push({ isActive: filters.isActive });
        }
        const mongoFilter = conditions.length === 0
            ? {}
            : conditions.length === 1
                ? conditions[0]
                : { $and: conditions };
        return this.findMany(mongoFilter, pagination, sort);
    }
}
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=customer.repository.js.map