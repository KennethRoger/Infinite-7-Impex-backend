import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  images: z
    .array(z.url('Image must be a valid URL'))
    .min(1, 'At least one image is required'),
  category: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Category must be a valid category ID'),
  isRemoved: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const CreateProductSchema = ProductSchema.omit({
  createdAt: true,
  updatedAt: true,
  isRemoved: true,
});
export type CreateProductDto = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = CreateProductSchema.partial();
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