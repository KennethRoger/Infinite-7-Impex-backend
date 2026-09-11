"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepository = void 0;
const base_repository_1 = require("./base.repository");
class AdminRepository extends base_repository_1.BaseRepository {
    constructor(db) {
        super(db, 'admins');
    }
    async findByEmail(email) {
        return this.findOne({ email });
    }
}
exports.AdminRepository = AdminRepository;
//# sourceMappingURL=admin.repository.js.map