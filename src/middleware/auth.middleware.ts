import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AppError } from './error-handler';
import { HTTP_STATUS } from '../types/http-status';
import { ERROR_CODES } from '../types/error-codes';

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

export function authenticateAdmin(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.UNAUTHORIZED,
      'Authentication token required'
    );
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.UNAUTHORIZED,
      'Authentication token required'
    );
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as AuthenticatedAdminPayload;
    req.user = decoded;
    next();
  } catch (_error) {
    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.UNAUTHORIZED,
      'Invalid or expired authentication token'
    );
  }
}
