import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { Admin } from '../models/admin.model';
export declare class AdminRepository extends BaseRepository<Admin> {
    constructor(db: Db);
    findByEmail(email: string): Promise<WithId<Admin> | null>;
}
//# sourceMappingURL=admin.repository.d.ts.map