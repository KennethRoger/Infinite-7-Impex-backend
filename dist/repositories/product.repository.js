"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const base_repository_1 = require("./base.repository");
class ProductRepository extends base_repository_1.BaseRepository {
    constructor(db) {
        super(db, 'products');
    }
    async findByCategory(categoryId) {
        const result = await this.findMany({ category: categoryId });
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
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map