"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicCache = publicCache;
/**
 * Cache-Control middleware for public GET endpoints.
 * Instructs browsers & edge CDNs to cache responses for maxAgeSeconds (default: 120s / 2m),
 * and allow stale-while-revalidate for swrSeconds (default: 600s / 10m).
 *
 * Requests containing Authorization headers (admin operations) are explicitly NEVER cached.
 */
function publicCache(maxAgeSeconds = 15, swrSeconds = 60) {
    return (req, res, next) => {
        // Only apply public cache to GET requests without an admin Authorization header
        if (req.method === 'GET' && !req.headers['authorization']) {
            res.setHeader('Cache-Control', `public, max-age=${maxAgeSeconds}, stale-while-revalidate=${swrSeconds}`);
        }
        else {
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        }
        next();
    };
}
//# sourceMappingURL=cache-control.js.map