"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = exports.CreateUserSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(2).max(100),
});
exports.CreateUserSchema = exports.UserSchema;
exports.UpdateUserSchema = exports.UserSchema.partial();
//# sourceMappingURL=user.model.js.map