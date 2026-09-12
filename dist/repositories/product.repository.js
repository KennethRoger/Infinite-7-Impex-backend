"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const base_repository_1 = require("./base.repository");
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
class ProductRepository extends base_repository_1.BaseRepository {
    constructor(db) {
        super(db, 'products');
    }
    async findByCategory(categoryId) {
        const result = await this.findMany({ category: categoryId, isRemoved: false });
        return result.data;
    }
    async findActive() {
        const result = await this.findMany({ isRemoved: false });
        return result.data;
    }
    async findActiveByCategory(categoryId) {
        const result = await this.findMany({ category: categoryId, isRemoved: false });
        return result.data;
    }
    async findFiltered(filters = {}, pagination, sort) {
        const mongoFilter = {
            isRemoved: false,
        };
        if (filters.category && filters.category.trim() !== '') {
            mongoFilter['category'] = filters.category.trim();
        }
        if (filters.name && filters.name.trim() !== '') {
            mongoFilter['name'] = {
                $regex: escapeRegex(filters.name.trim()),
                $options: 'i',
            };
        }
        return this.findMany(mongoFilter, pagination, sort);
    }
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map