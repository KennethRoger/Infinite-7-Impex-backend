"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductSchema = exports.CreateProductSchema = exports.ProductSchema = void 0;
const zod_1 = require("zod");
exports.ProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200),
    description: zod_1.z.string().optional(),
    images: zod_1.z.array(zod_1.z.string().url()).default([]),
    category: zod_1.z.string(), // ObjectId reference to productCategory
    isRemoved: zod_1.z.boolean().default(false),
});
exports.CreateProductSchema = exports.ProductSchema;
exports.UpdateProductSchema = exports.ProductSchema.partial();
//# sourceMappingURL=product.model.js.map