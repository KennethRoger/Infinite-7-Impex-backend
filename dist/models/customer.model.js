"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerSchema = exports.CreateCustomerSchema = exports.CustomerSchema = exports.CustomerPriorityEnum = void 0;
const zod_1 = require("zod");
exports.CustomerPriorityEnum = zod_1.z.enum(['high', 'low', 'medium', 'unset']);
exports.CustomerSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1).max(100),
    email: zod_1.z.string().email(),
    country: zod_1.z.string().min(1).max(100),
    phone: zod_1.z.string().min(1).max(20),
    priority: exports.CustomerPriorityEnum.default('unset'),
    isActive: zod_1.z.boolean().default(true),
    notes: zod_1.z.string().optional(),
});
exports.CreateCustomerSchema = exports.CustomerSchema;
exports.UpdateCustomerSchema = exports.CustomerSchema.partial();
//# sourceMappingURL=customer.model.js.map