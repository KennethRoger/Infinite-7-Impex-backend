import { WithId } from 'mongodb';
import { UserRepository } from '../repositories/user.repository';
import { User, CreateUserDto, UpdateUserDto } from '../models/user.model';
import { PaginationOptions, SortOptions } from '../types/common';
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    getUserById(id: string): Promise<WithId<User>>;
    getUserByEmail(email: string): Promise<WithId<User> | null>;
    getAllUsers(pagination?: PaginationOptions, sort?: SortOptions): Promise<{
        data: WithId<User>[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    createUser(userData: CreateUserDto): Promise<WithId<User>>;
    updateUser(id: string, userData: UpdateUserDto): Promise<WithId<User>>;
    deleteUser(id: string): Promise<void>;
    private validateCreateUser;
    private validateUpdateUser;
}
//# sourceMappingURL=user.service.d.ts.map