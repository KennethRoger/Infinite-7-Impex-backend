import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(_req: Request, res: Response, next: NextFunction): Promise<void>;
    getMe(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map