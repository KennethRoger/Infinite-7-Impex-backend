import { Request, Response, NextFunction } from 'express';

/**
 * Cache-Control middleware for public GET endpoints.
 * Instructs browsers & edge CDNs to cache responses for maxAgeSeconds (default: 120s / 2m),
 * and allow stale-while-revalidate for swrSeconds (default: 600s / 10m).
 *
 * Requests containing Authorization headers (admin operations) are explicitly NEVER cached.
 */
export function publicCache(maxAgeSeconds = 15, swrSeconds = 60) {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Only apply public cache to GET requests without an admin Authorization header
    if (req.method === 'GET' && !req.headers['authorization']) {
      res.setHeader(
        'Cache-Control',
        `public, max-age=${maxAgeSeconds}, stale-while-revalidate=${swrSeconds}`
      );
    } else {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    }
    next();
  };
}
