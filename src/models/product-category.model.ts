import { z } from 'zod';

export const ProductCategorySchema = z.object({
  name: z
    .string()
    .min(2, 'Name is required and must be between 2 and 50 characters')
    .max(50, 'Name is required and must be between 2 and 50 characters'),
  description: z.string().optional(),
  image: z.string().url('Image must be a valid URL').optional(),
  isRemoved: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ProductCategory = z.infer<typeof ProductCategorySchema>;

export const CreateProductCategorySchema = ProductCategorySchema.omit({
  createdAt: true,
  updatedAt: true,
});
export type CreateProductCategoryDto = z.infer<typeof CreateProductCategorySchema>;

export const UpdateProductCategorySchema = ProductCategorySchema.omit({
  createdAt: true,
  updatedAt: true,
  isRemoved: true,
}).partial();
export type UpdateProductCategoryDto = z.infer<typeof UpdateProductCategorySchema>;

export interface ProductCategoryQueryFilters {
  name?: string;
}