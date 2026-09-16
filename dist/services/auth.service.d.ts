import { AdminRepository } from '../repositories/admin.repository';
import { AdminLoginDto } from '../models/admin.model';
export interface AuthResult {
    token: string;
    admin: {
        id: string;
        email: string;
        role: string;
    };
}
export declare class AuthService {
    private adminRepository;
    constructor(adminRepository: AdminRepository);
    login(dto: AdminLoginDto): Promise<AuthResult>;
    logout(): Promise<void>;
}
//# sourceMappingURL=auth.service.d.ts.map