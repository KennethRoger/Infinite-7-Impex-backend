"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductSchema = exports.CreateProductSchema = exports.ProductSchema = void 0;
const zod_1 = require("zod");
exports.ProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    description: zod_1.z.string().optional(),
    images: zod_1.z
        .array(zod_1.z.url('Image must be a valid URL'))
        .min(1, 'At least one image is required'),
    category: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Category must be a valid category ID'),
    isRemoved: zod_1.z.boolean().default(false),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.CreateProductSchema = exports.ProductSchema.omit({
    createdAt: true,
    updatedAt: true,
    isRemoved: true,
});
exports.UpdateProductSchema = exports.CreateProductSchema.partial();
//# sourceMappingURL=product.model.js.map