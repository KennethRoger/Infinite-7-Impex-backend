export declare const config: {
    port: number;
    mongo: {
        connectionString: string;
        dbName: string;
    };
    mail: {
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
    admin: {
        email: string;
        password: string;
    };
    rateLimit: {
        windowMs: number;
        max: number;
    };
};
//# sourceMappingURL=index.d.ts.map