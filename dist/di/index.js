"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
exports.initializeDI = initializeDI;
const container_1 = require("./container");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return container_1.container; } });
const database_1 = require("../config/database");
const user_repository_1 = require("../repositories/user.repository");
const user_service_1 = require("../services/user.service");
const user_controller_1 = require("../controllers/user.controller");
function initializeDI() {
    container_1.container.register('database', () => database_1.Database.getInstance(), true);
    container_1.container.register('userRepository', () => {
        const db = container_1.container.resolve('database').getDb();
        return new user_repository_1.UserRepository(db);
    }, true);
    container_1.container.register('userService', () => {
        const userRepository = container_1.container.resolve('userRepository');
        return new user_service_1.UserService(userRepository);
    }, true);
    container_1.container.register('userController', () => {
        const userService = container_1.container.resolve('userService');
        return new user_controller_1.UserController(userService);
    }, true);
}
//# sourceMappingURL=index.js.map