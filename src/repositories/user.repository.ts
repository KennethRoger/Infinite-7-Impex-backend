import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { User } from '../models/user.model';

export class UserRepository extends BaseRepository<User> {
  constructor(db: Db) {
    super(db, 'users');
  }

  async findByEmail(email: string): Promise<WithId<User> | null> {
    return this.findOne({ email });
  }
}