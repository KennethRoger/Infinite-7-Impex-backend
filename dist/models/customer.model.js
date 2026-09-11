"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerPrioritySchema = exports.UpdateCustomerSchema = exports.CreateCustomerSchema = exports.CustomerSchema = exports.CustomerPriorityEnum = exports.CUSTOMER_PRIORITIES = void 0;
const zod_1 = require("zod");
exports.CUSTOMER_PRIORITIES = ['high', 'low', 'medium', 'unset'];
exports.CustomerPriorityEnum = zod_1.z.enum(exports.CUSTOMER_PRIORITIES);
exports.CustomerSchema = zod_1.z.object({
    fullName: zod_1.z
        .string()
        .min(2, 'Name should be greater than 1 and less than 20 chars')
        .max(20, 'Name should be greater than 1 and less than 20 chars'),
    email: zod_1.z.email('Email must be a valid email address'),
    country: zod_1.z.string().min(1, 'Invalid Country'),
    phone: zod_1.z.string().min(1, 'Phone number is required'),
    message: zod_1.z.string().min(1, 'Message is required'),
    priority: exports.CustomerPriorityEnum.default('unset'),
    isActive: zod_1.z.boolean().default(true),
    notes: zod_1.z.string().default(''),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.CreateCustomerSchema = exports.CustomerSchema.omit({
    createdAt: true,
    updatedAt: true,
});
exports.UpdateCustomerSchema = exports.CustomerSchema.omit({
    createdAt: true,
    updatedAt: true,
}).partial();
exports.UpdateCustomerPrioritySchema = zod_1.z.object({
    priority: exports.CustomerPriorityEnum,
});
//# sourceMappingURL=customer.model.js.map