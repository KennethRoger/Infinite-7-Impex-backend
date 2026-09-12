import { Db, WithId, ObjectId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { Blog, BlogQueryFilters } from '../models/blog.model';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export class BlogRepository extends BaseRepository<Blog> {
  constructor(db: Db) {
    super(db, 'blogs');
  }

  async findByTitle(title: string): Promise<WithId<Blog> | null> {
    return this.findOne({ title });
  }

  async searchByTitle(searchTerm: string): Promise<WithId<Blog>[]> {
    const result = await this.findMany({
      title: { $regex: escapeRegex(searchTerm), $options: 'i' },
    });
    return result.data;
  }

  async findFiltered(
    filters: BlogQueryFilters = {},
    pagination?: PaginationOptions,
    sort?: SortOptions
  ): Promise<PaginatedResult<WithId<Blog>>> {
    const mongoFilter: Record<string, unknown> = {};

    if (filters.title && filters.title.trim() !== '') {
      mongoFilter['title'] = {
        $regex: escapeRegex(filters.title.trim()),
        $options: 'i',
      };
    }

    return this.findMany(mongoFilter, pagination, sort);
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