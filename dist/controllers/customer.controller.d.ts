import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../services/customer.service';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    createCustomer(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllCustomers(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCustomerById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updatePriority(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteCustomer(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=customer.controller.d.ts.map