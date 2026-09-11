"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongodb_1 = require("mongodb");
class Database {
    constructor() {
        this.client = null;
        this.db = null;
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    async connect(connectionString, dbName) {
        if (this.client) {
            return;
        }
        this.client = new mongodb_1.MongoClient(connectionString);
        await this.client.connect();
        this.db = this.client.db(dbName);
        console.log(`Connected to MongoDB database: ${dbName}`);
    }
    getDb() {
        if (!this.db) {
            throw new Error('Database not initialized. Call connect() first.');
        }
        return this.db;
    }
    async disconnect() {
        if (this.client) {
            await this.client.close();
            this.client = null;
            this.db = null;
            console.log('Disconnected from MongoDB');
        }
    }
    isConnected() {
        return this.client !== null && this.db !== null;
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map