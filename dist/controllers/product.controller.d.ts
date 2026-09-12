import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    createProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void>;
    getProductById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=product.controller.d.ts.map