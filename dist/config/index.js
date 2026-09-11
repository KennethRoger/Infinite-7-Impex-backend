"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    port: parseInt(process.env['PORT'] || '3000', 10),
    mongo: {
        connectionString: process.env['MONGODB_CONNECTION_STRING'] || 'mongodb://localhost:27017',
        dbName: process.env['MONGODB_DB_NAME'] || 'infinite7_impex',
    },
    mail: {
        host: process.env['SMTP_HOST'] || '',
        port: parseInt(process.env['SMTP_PORT'] || '587', 10),
        secure: process.env['SMTP_SECURE'] === 'true',
        user: process.env['SMTP_USER'] || '',
        pass: process.env['SMTP_PASS'] || '',
        from: process.env['EMAIL_FROM'] || 'Infinite 7 Impex <noreply@infinite7impex.com>',
        adminEmail: process.env['ADMIN_EMAIL'] || 'admin@infinite7impex.com',
    },
    jwt: {
        secret: process.env['JWT_SECRET'] || 'infinite7_jwt_secret_key_change_in_production',
        expiresIn: process.env['JWT_EXPIRES_IN'] || '24h',
    },
    admin: {
        email: process.env['ADMIN_EMAIL'] || 'admin@infinite7impex.com',
        password: process.env['ADMIN_PASSWORD'] || 'Admin@12345',
    },
    rateLimit: {
        windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000', 10), // 15 minutes
        max: parseInt(process.env['RATE_LIMIT_MAX'] || '100', 10), // Limit each IP to 100 requests per window
    },
};
//# sourceMappingURL=index.js.map