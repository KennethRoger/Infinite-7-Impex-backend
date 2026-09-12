import { WithId } from 'mongodb';
import { BlogRepository } from '../repositories/blog.repository';
import { Blog, CreateBlogDto, UpdateBlogDto, BlogQueryFilters, BlogSummary } from '../models/blog.model';
import { PaginationOptions, PaginatedResult, SortOptions } from '../types/common';
export declare class BlogService {
    private blogRepository;
    constructor(blogRepository: BlogRepository);
    createBlog(dto: CreateBlogDto): Promise<WithId<Blog>>;
    updateBlog(id: string, dto: UpdateBlogDto): Promise<WithId<Blog>>;
    deleteBlog(id: string): Promise<{
        title: string;
    }>;
    getAllBlogs(filters?: BlogQueryFilters, pagination?: PaginationOptions, sort?: SortOptions): Promise<PaginatedResult<BlogSummary>>;
    getBlogById(id: string): Promise<WithId<Blog>>;
}
//# sourceMappingURL=blog.service.d.ts.map