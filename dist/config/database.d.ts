import { Db } from 'mongodb';
export declare class Database {
    private static instance;
    private client;
    private db;
    private constructor();
    static getInstance(): Database;
    connect(connectionString: string, dbName: string): Promise<void>;
    getDb(): Db;
    disconnect(): Promise<void>;
    isConnected(): boolean;
}
//# sourceMappingURL=database.d.ts.map