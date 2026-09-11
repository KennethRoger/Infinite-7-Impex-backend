"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const database_1 = require("./config/database");
const di_1 = require("./di");
// Load environment variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = config_1.config.port;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error('Error:', err);
    if (err.message.includes('not found')) {
        res.status(404).json({ error: err.message });
    }
    else if (err.message.includes('Validation error')) {
        res.status(400).json({ error: err.message });
    }
    else if (err.message.includes('already exists')) {
        res.status(409).json({ error: err.message });
    }
    else {
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
});
// Basic routes
app.get('/', (_req, res) => {
    res.json({ message: 'Welcome to Infinite 7 Impex API' });
});
app.get('/health', (_req, res) => {
    const db = database_1.Database.getInstance();
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: db.isConnected() ? 'connected' : 'disconnected'
    });
});
// Initialize application
async function startServer() {
    try {
        // Connect to database
        const database = database_1.Database.getInstance();
        await database.connect(config_1.config.mongo.connectionString, config_1.config.mongo.dbName);
        // Initialize dependency injection
        (0, di_1.initializeDI)();
        // Routes will be registered here when services are implemented
        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Health check available at http://localhost:${PORT}/health`);
            console.log(`API available at http://localhost:${PORT}/api`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully...');
    const database = database_1.Database.getInstance();
    await database.disconnect();
    process.exit(0);
});
process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully...');
    const database = database_1.Database.getInstance();
    await database.disconnect();
    process.exit(0);
});
startServer();
//# sourceMappingURL=index.js.map