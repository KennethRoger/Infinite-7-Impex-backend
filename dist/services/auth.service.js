"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const error_handler_1 = require("../middleware/error-handler");
const http_status_1 = require("../types/http-status");
const error_codes_1 = require("../types/error-codes");
class AuthService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async login(dto) {
        const admin = await this.adminRepository.findByEmail(dto.email);
        if (!admin) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.UNAUTHORIZED, error_codes_1.ERROR_CODES.UNAUTHORIZED, 'Invalid email or password');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(dto.password, admin.passwordHash);
        if (!isPasswordValid) {
            throw new error_handler_1.AppError(http_status_1.HTTP_STATUS.UNAUTHORIZED, error_codes_1.ERROR_CODES.UNAUTHORIZED, 'Invalid email or password');
        }
        const token = jsonwebtoken_1.default.sign({
            id: admin._id.toString(),
            email: admin.email,
            role: admin.role,
        }, config_1.config.jwt.secret, {
            expiresIn: config_1.config.jwt.expiresIn,
        });
        return {
            token,
            admin: {
                id: admin._id.toString(),
                email: admin.email,
                role: admin.role,
            },
        };
    }
    async logout() {
        // Stateless JWT logout
        return;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map