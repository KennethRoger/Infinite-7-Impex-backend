import { Db, WithId, ObjectId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { Blog } from '../models/blog.model';

export class BlogRepository extends BaseRepository<Blog> {
  constructor(db: Db) {
    super(db, 'blogs');
  }

  async findByTitle(title: string): Promise<WithId<Blog> | null> {
    return this.findOne({ title });
  }

  async searchByTitle(searchTerm: string): Promise<WithId<Blog>[]> {
    const result = await this.findMany({ 
      title: { $regex: searchTerm, $options: 'i' } 
    });
    return result.data;
  }

  async addSection(blogId: string, section: any): Promise<WithId<Blog> | null> {
    const collection = this.getCollection();
    await collection.updateOne(
      { _id: new ObjectId(blogId) },
      { $push: { sections: section } }
    );
    return this.findById(blogId);
  }

  async removeSection(blogId: string, sectionIndex: number): Promise<WithId<Blog> | null> {
    const collection = this.getCollection();
    await collection.updateOne(
      { _id: new ObjectId(blogId) },
      { $unset: { [`sections.${sectionIndex}`]: 1 } }
    );
    await collection.updateOne(
      { _id: new ObjectId(blogId) },
      { $pull: { sections: null } } as any
    );
    return this.findById(blogId);
  }
}