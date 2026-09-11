import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { User } from '../models/user.model';
export declare class UserRepository extends BaseRepository<User> {
    constructor(db: Db);
    findByEmail(email: string): Promise<WithId<User> | null>;
}
//# sourceMappingURL=user.repository.d.ts.map