"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlogSchema = exports.CreateBlogSchema = exports.BlogSchema = exports.BlogSectionSchema = void 0;
const zod_1 = require("zod");
// Embedded document for blog sections
exports.BlogSectionSchema = zod_1.z.object({
    sectionTitle: zod_1.z.string().optional(),
    description: zod_1.z.string().min(1),
});
// Main blog schema with embedded sections
exports.BlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200),
    description: zod_1.z.string().min(1),
    image: zod_1.z.string().url().optional(),
    sections: zod_1.z.array(exports.BlogSectionSchema).default([]),
});
exports.CreateBlogSchema = exports.BlogSchema;
exports.UpdateBlogSchema = exports.BlogSchema.partial();
//# sourceMappingURL=blog.model.js.map