import { z } from 'zod';
export declare const ProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    images: z.ZodDefault<z.ZodArray<z.ZodString>>;
    category: z.ZodString;
    isRemoved: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type Product = z.infer<typeof ProductSchema>;
export declare const CreateProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    images: z.ZodDefault<z.ZodArray<z.ZodString>>;
    category: z.ZodString;
    isRemoved: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateProductDto = z.infer<typeof CreateProductSchema>;
export declare const UpdateProductSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    images: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    category: z.ZodOptional<z.ZodString>;
    isRemoved: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
//# sourceMappingURL=product.model.d.ts.map