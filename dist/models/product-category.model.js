"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductCategorySchema = exports.CreateProductCategorySchema = exports.ProductCategorySchema = void 0;
const zod_1 = require("zod");
exports.ProductCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().optional(),
    image: zod_1.z.string().url().optional(),
    isRemoved: zod_1.z.boolean().default(false),
});
exports.CreateProductCategorySchema = exports.ProductCategorySchema;
exports.UpdateProductCategorySchema = exports.ProductCategorySchema.partial();
//# sourceMappingURL=product-category.model.js.map