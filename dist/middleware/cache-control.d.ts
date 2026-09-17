import { Request, Response, NextFunction } from 'express';
/**
 * Cache-Control middleware for public GET endpoints.
 * Instructs browsers & edge CDNs to cache responses for maxAgeSeconds (default: 120s / 2m),
 * and allow stale-while-revalidate for swrSeconds (default: 600s / 10m).
 *
 * Requests containing Authorization headers (admin operations) are explicitly NEVER cached.
 */
export declare function publicCache(maxAgeSeconds?: number, swrSeconds?: number): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=cache-control.d.ts.map