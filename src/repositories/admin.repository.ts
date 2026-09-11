import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { Admin } from '../models/admin.model';

export class AdminRepository extends BaseRepository<Admin> {
  constructor(db: Db) {
    super(db, 'admins');
  }

  async findByEmail(email: string): Promise<WithId<Admin> | null> {
    return this.findOne({ email });
  }
}
