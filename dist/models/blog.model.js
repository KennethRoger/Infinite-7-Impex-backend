"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlogSchema = exports.CreateBlogSchema = exports.BlogSchema = exports.BlogSectionSchema = void 0;
const zod_1 = require("zod");
// Embedded document for blog sections
exports.BlogSectionSchema = zod_1.z.object({
    sectionTitle: zod_1.z.string().optional().or(zod_1.z.literal('')),
    description: zod_1.z
        .string({ message: 'Section description is required' })
        .min(1, 'Section description is required'),
});
// Main blog schema
exports.BlogSchema = zod_1.z.object({
    title: zod_1.z
        .string({ message: 'Title is required and must be under 150 characters' })
        .min(1, 'Title is required and must be under 150 characters')
        .max(150, 'Title is required and must be under 150 characters'),
    description: zod_1.z
        .string({ message: 'Description is required' })
        .min(1, 'Description is required'),
    image: zod_1.z.string().url('Image must be a valid URL').optional().or(zod_1.z.literal('')),
    sections: zod_1.z
        .array(exports.BlogSectionSchema, { message: 'At least one section is required' })
        .min(1, 'At least one section is required')
        .max(5, 'A blog can have a maximum of 5 sections'),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
// DTO Schemas
exports.CreateBlogSchema = exports.BlogSchema.omit({
    createdAt: true,
    updatedAt: true,
});
exports.UpdateBlogSchema = zod_1.z.object({
    title: zod_1.z
        .string({ message: 'Title is required and must be under 150 characters' })
        .min(1, 'Title is required and must be under 150 characters')
        .max(150, 'Title is required and must be under 150 characters')
        .optional(),
    description: zod_1.z
        .string({ message: 'Description is required' })
        .min(1, 'Description is required')
        .optional(),
    image: zod_1.z.string().url('Image must be a valid URL').optional().or(zod_1.z.literal('')),
    sections: zod_1.z
        .array(exports.BlogSectionSchema, { message: 'At least one section is required' })
        .min(1, 'At least one section is required')
        .max(5, 'A blog can have a maximum of 5 sections')
        .optional(),
});
//# sourceMappingURL=blog.model.js.map