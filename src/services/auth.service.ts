import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminRepository } from '../repositories/admin.repository';
import { AdminLoginDto } from '../models/admin.model';
import { config } from '../config';
import { AppError } from '../middleware/error-handler';
import { HTTP_STATUS } from '../types/http-status';
import { ERROR_CODES } from '../types/error-codes';

export interface AuthResult {
  token: string;
  admin: {
    id: string;
    email: string;
    role: string;
  };
}

export class AuthService {
  constructor(private adminRepository: AdminRepository) {}

  async seedInitialAdmin(): Promise<void> {
    const adminEmail = config.admin.email;
    const existingAdmin = await this.adminRepository.findByEmail(adminEmail);

    if (!existingAdmin) {
      const passwordHash = await bcryptjs.hash(config.admin.password, 10);
      await this.adminRepository.create({
        email: adminEmail,
        passwordHash,
        role: 'admin',
      });
      console.log(`[AuthService] Initial admin account initialized for: ${adminEmail}`);
    }
  }

  async login(dto: AdminLoginDto): Promise<AuthResult> {
    const admin = await this.adminRepository.findByEmail(dto.email);
    if (!admin) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.UNAUTHORIZED,
        'Invalid email or password'
      );
    }

    const isPasswordValid = await bcryptjs.compare(dto.password, admin.passwordHash);
    if (!isPasswordValid) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.UNAUTHORIZED,
        'Invalid email or password'
      );
    }

    const token = jwt.sign(
      {
        id: admin._id.toString(),
        email: admin.email,
        role: admin.role,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn as any,
      }
    );

    return {
      token,
      admin: {
        id: admin._id.toString(),
        email: admin.email,
        role: admin.role,
      },
    };
  }

  async logout(): Promise<void> {
    // Stateless JWT logout
    return;
  }
}
