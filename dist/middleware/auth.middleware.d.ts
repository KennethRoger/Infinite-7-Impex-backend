import { Request, Response, NextFunction } from 'express';
export interface AuthenticatedAdminPayload {
    id: string;
    email: string;
    role: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedAdminPayload;
        }
    }
}
export declare function authenticateAdmin(req: Request, _res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.middleware.d.ts.map