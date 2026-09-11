import { Db, WithId } from 'mongodb';
import { BaseRepository } from './base.repository';
import { Blog } from '../models/blog.model';
export declare class BlogRepository extends BaseRepository<Blog> {
    constructor(db: Db);
    findByTitle(title: string): Promise<WithId<Blog> | null>;
    searchByTitle(searchTerm: string): Promise<WithId<Blog>[]>;
    addSection(blogId: string, section: any): Promise<WithId<Blog> | null>;
    removeSection(blogId: string, sectionIndex: number): Promise<WithId<Blog> | null>;
}
//# sourceMappingURL=blog.repository.d.ts.map