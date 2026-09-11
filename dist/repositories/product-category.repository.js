"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryRepository = void 0;
const base_repository_1 = require("./base.repository");
class ProductCategoryRepository extends base_repository_1.BaseRepository {
    constructor(db) {
        super(db, 'productCategories');
    }
    async findActive() {
        const result = await this.findMany({ isRemoved: false });
        return result.data;
    }
    async findByName(name) {
        return this.findOne({ name });
    }
}
exports.ProductCategoryRepository = ProductCategoryRepository;
//# sourceMappingURL=product-category.repository.js.map