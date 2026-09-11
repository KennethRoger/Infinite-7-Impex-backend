"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const database_1 = require("./config/database");
const di_1 = require("./di");
const error_handler_1 = require("./middleware/error-handler");
const response_helpers_1 = require("./utils/response-helpers");
// Load environment variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = config_1.config.port;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Basic routes
app.get('/', (_req, res) => {
    res.json((0, response_helpers_1.createSuccessResponse)({ message: 'Welcome to Infinite 7 Impex API' }, 'API is running'));
});
app.get('/health', (_req, res) => {
    const db = database_1.Database.getInstance();
    const healthData = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: db.isConnected() ? 'connected' : 'disconnected'
    };
    res.json((0, response_helpers_1.createSuccessResponse)(healthData, 'Health check successful'));
});
// 404 handler (must be after all routes)
app.use((_req, res) => {
    res.status(404).json((0, response_helpers_1.createNotFoundResponse)('Route not found'));
});
// Error handling middleware (must be last)
app.use(error_handler_1.errorHandler);
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