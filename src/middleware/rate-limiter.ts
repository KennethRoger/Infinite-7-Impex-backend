import rateLimit from 'express-rate-limit';
import { config } from '../config';
import { createTooManyRequestsResponse } from '../utils/response-helpers';
import { HTTP_STATUS } from '../types/http-status';

export const globalRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json(
      createTooManyRequestsResponse('Too many requests, please try again later')
    );
  },
});
