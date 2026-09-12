import { Request, Response, NextFunction } from 'express';
import { BlogService } from '../services/blog.service';
export declare class BlogController {
    private blogService;
    constructor(blogService: BlogService);
    createBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllBlogs(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBlogById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=blog.controller.d.ts.map