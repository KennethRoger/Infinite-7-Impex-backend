"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductCategorySchema = exports.CreateProductCategorySchema = exports.ProductCategorySchema = void 0;
const zod_1 = require("zod");
exports.ProductCategorySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Name is required and must be between 2 and 50 characters')
        .max(50, 'Name is required and must be between 2 and 50 characters'),
    description: zod_1.z.string().optional(),
    image: zod_1.z.url('Image must be a valid URL').optional(),
    isRemoved: zod_1.z.boolean().default(false),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.CreateProductCategorySchema = exports.ProductCategorySchema.omit({
    createdAt: true,
    updatedAt: true,
});
exports.UpdateProductCategorySchema = exports.ProductCategorySchema.omit({
    createdAt: true,
    updatedAt: true,
    isRemoved: true,
}).partial();
//# sourceMappingURL=product-category.model.js.map