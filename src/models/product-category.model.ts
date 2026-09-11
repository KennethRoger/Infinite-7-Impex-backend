import { z } from 'zod';

export const ProductCategorySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  image: z.string().url().optional(),
  isRemoved: z.boolean().default(false),
});

export type ProductCategory = z.infer<typeof ProductCategorySchema>;

export const CreateProductCategorySchema = ProductCategorySchema;
export type CreateProductCategoryDto = z.infer<typeof CreateProductCategorySchema>;

export const UpdateProductCategorySchema = ProductCategorySchema.partial();
export type UpdateProductCategoryDto = z.infer<typeof UpdateProductCategorySchema>;