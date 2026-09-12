"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryRepository = void 0;
const base_repository_1 = require("./base.repository");
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
class ProductCategoryRepository extends base_repository_1.BaseRepository {
    constructor(db) {
        super(db, 'productCategories');
    }
    async findActive() {
        const result = await this.findMany({ isRemoved: false });
        return result.data;
    }
    async findByName(name) {
        return this.findOne({
            name: { $regex: `^${escapeRegex(name.trim())}$`, $options: 'i' },
            isRemoved: false,
        });
    }
    async findFiltered(filters = {}, pagination, sort) {
        const mongoFilter = {
            isRemoved: false,
        };
        if (filters.name && filters.name.trim() !== '') {
            mongoFilter['name'] = {
                $regex: escapeRegex(filters.name.trim()),
                $options: 'i',
            };
        }
        return this.findMany(mongoFilter, pagination, sort);
    }
}
exports.ProductCategoryRepository = ProductCategoryRepository;
//# sourceMappingURL=product-category.repository.js.map