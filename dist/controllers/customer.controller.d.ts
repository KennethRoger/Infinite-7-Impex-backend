import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../services/customer.service';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    createCustomer(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=customer.controller.d.ts.map