import { z } from 'zod';
export declare const ProductCategorySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    isRemoved: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type ProductCategory = z.infer<typeof ProductCategorySchema>;
export declare const CreateProductCategorySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    isRemoved: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateProductCategoryDto = z.infer<typeof CreateProductCategorySchema>;
export declare const UpdateProductCategorySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isRemoved: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
export type UpdateProductCategoryDto = z.infer<typeof UpdateProductCategorySchema>;
//# sourceMappingURL=product-category.model.d.ts.map