import { Request, Response, NextFunction } from 'express';
import { ProductCategoryService } from '../services/product-category.service';
export declare class ProductCategoryController {
    private productCategoryService;
    constructor(productCategoryService: ProductCategoryService);
    createCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=product-category.controller.d.ts.map