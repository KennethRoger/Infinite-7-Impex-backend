import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AdminLoginSchema } from '../models/admin.model';
import { createSuccessResponse } from '../utils/response-helpers';
import { HTTP_STATUS } from '../types/http-status';

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = AdminLoginSchema.parse(req.body);
      const result = await this.authService.login(validatedData);

      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(result, 'Admin logged in successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  async logout(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.authService.logout();
      res.status(HTTP_STATUS.OK).json(
        createSuccessResponse(null, 'Admin logged out successfully')
      );
    } catch (error) {
      next(error);
    }
  }
}
