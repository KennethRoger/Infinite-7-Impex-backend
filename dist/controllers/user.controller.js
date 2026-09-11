"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAllUsers(req, res, next) {
        try {
            const page = parseInt(req.query['page']) || 1;
            const limit = parseInt(req.query['limit']) || 10;
            const sortBy = req.query['sortBy'] || 'createdAt';
            const sortOrder = (req.query['sortOrder'] === 'asc' ? 'asc' : 'desc');
            const result = await this.userService.getAllUsers({ page, limit }, { field: sortBy, order: sortOrder });
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getUserById(req, res, next) {
        try {
            const id = req.params['id'];
            const user = await this.userService.getUserById(id);
            res.json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async createUser(req, res, next) {
        try {
            const userData = req.body;
            const user = await this.userService.createUser(userData);
            res.status(201).json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const id = req.params['id'];
            const userData = req.body;
            const user = await this.userService.updateUser(id, userData);
            res.json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const id = req.params['id'];
            await this.userService.deleteUser(id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map