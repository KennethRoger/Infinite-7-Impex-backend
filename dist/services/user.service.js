"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const zod_1 = require("zod");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    async getUserByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    async getAllUsers(pagination, sort) {
        return this.userRepository.findMany({}, pagination, sort);
    }
    async createUser(userData) {
        const validatedData = this.validateCreateUser(userData);
        const existingUser = await this.userRepository.findByEmail(validatedData.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        return this.userRepository.create(validatedData);
    }
    async updateUser(id, userData) {
        const validatedData = this.validateUpdateUser(userData);
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new Error('User not found');
        }
        if (validatedData.email !== undefined && validatedData.email !== existingUser.email) {
            const emailExists = await this.userRepository.findByEmail(validatedData.email);
            if (emailExists) {
                throw new Error('User with this email already exists');
            }
        }
        const updateData = {};
        if (validatedData.email !== undefined)
            updateData.email = validatedData.email;
        if (validatedData.name !== undefined)
            updateData.name = validatedData.name;
        const updatedUser = await this.userRepository.update(id, updateData);
        if (!updatedUser) {
            throw new Error('Failed to update user');
        }
        return updatedUser;
    }
    async deleteUser(id) {
        const exists = await this.userRepository.findById(id);
        if (!exists) {
            throw new Error('User not found');
        }
        const deleted = await this.userRepository.delete(id);
        if (!deleted) {
            throw new Error('Failed to delete user');
        }
    }
    validateCreateUser(data) {
        try {
            return user_model_1.CreateUserSchema.parse(data);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                throw new Error(`Validation error: ${error.issues.map((e) => e.message).join(', ')}`);
            }
            throw error;
        }
    }
    validateUpdateUser(data) {
        try {
            return user_model_1.UpdateUserSchema.parse(data);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                throw new Error(`Validation error: ${error.issues.map((e) => e.message).join(', ')}`);
            }
            throw error;
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map