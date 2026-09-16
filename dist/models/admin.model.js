"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminLoginSchema = exports.AdminSchema = void 0;
const zod_1 = require("zod");
exports.AdminSchema = zod_1.z.object({
    email: zod_1.z.email('Email must be a valid email address'),
    passwordHash: zod_1.z.string(),
    role: zod_1.z.literal('admin').default('admin'),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.AdminLoginSchema = zod_1.z.object({
    email: zod_1.z.email('Email must be a valid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
//# sourceMappingURL=admin.model.js.map