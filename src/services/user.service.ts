import { WithId } from 'mongodb';
import { UserRepository } from '../repositories/user.repository';
import { User, CreateUserDto, UpdateUserDto, CreateUserSchema, UpdateUserSchema } from '../models/user.model';
import { PaginationOptions, SortOptions } from '../types/common';
import { ZodError } from 'zod';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: string): Promise<WithId<User>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<WithId<User> | null> {
    return this.userRepository.findByEmail(email);
  }

  async getAllUsers(
    pagination?: PaginationOptions,
    sort?: SortOptions
  ): Promise<{ data: WithId<User>[]; total: number; page: number; limit: number; totalPages: number }> {
    return this.userRepository.findMany({}, pagination, sort);
  }

  async createUser(userData: CreateUserDto): Promise<WithId<User>> {
    const validatedData = this.validateCreateUser(userData);
    
    const existingUser = await this.userRepository.findByEmail(validatedData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    return this.userRepository.create(validatedData);
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<WithId<User>> {
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
    
    const updateData: Partial<User> = {};
    if (validatedData.email !== undefined) updateData.email = validatedData.email;
    if (validatedData.name !== undefined) updateData.name = validatedData.name;
    
    const updatedUser = await this.userRepository.update(id, updateData);
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
    
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const exists = await this.userRepository.findById(id);
    if (!exists) {
      throw new Error('User not found');
    }
    
    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new Error('Failed to delete user');
    }
  }

  private validateCreateUser(data: unknown): CreateUserDto {
    try {
      return CreateUserSchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Validation error: ${error.issues.map((e: any) => e.message).join(', ')}`);
      }
      throw error;
    }
  }

  private validateUpdateUser(data: unknown): UpdateUserDto {
    try {
      return UpdateUserSchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Validation error: ${error.issues.map((e: any) => e.message).join(', ')}`);
      }
      throw error;
    }
  }
}