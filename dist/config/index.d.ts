export declare const config: {
    port: number;
    mongo: {
        connectionString: string;
        dbName: string;
    };
    mail: {
        resendApiKey: string;
        resendFrom: string;
        host: string;
        port: number;
        secure: boolean;
        user: string;
        pass: string;
        from: string;
        adminEmail: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    rateLimit: {
        windowMs: number;
        max: number;
    };
    cloudinary: {
        cloudName: string;
        apiKey: string;
        apiSecret: string;
    };
    cors: {
        allowedOrigins: string[];
    };
};
//# sourceMappingURL=index.d.ts.map