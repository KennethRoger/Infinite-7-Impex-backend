import { z } from 'zod';
export declare const ProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    images: z.ZodArray<z.ZodURL>;
    category: z.ZodString;
    isRemoved: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
export type Product = z.infer<typeof ProductSchema>;
export declare const CreateProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    images: z.ZodArray<z.ZodURL>;
    category: z.ZodString;
}, z.core.$strip>;
export type CreateProductDto = z.infer<typeof CreateProductSchema>;
export declare const UpdateProductSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    images: z.ZodOptional<z.ZodArray<z.ZodURL>>;
    category: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
export interface PopulatedCategory {
    _id: string;
    name: string;
}
export interface PopulatedProduct extends Omit<Product, 'category'> {
    _id: string;
    category: PopulatedCategory;
}
export interface ProductQueryFilters {
    category?: string;
    name?: string;
}
//# sourceMappingURL=product.model.d.ts.map